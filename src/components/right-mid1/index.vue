<template>
    <div class="container">
        <div class="textNum">
            <div class="textNum-left box1">
                <p style="color: white; font-family:electronicFont;">40 </p>
                <p style="color: white; font-size: 14px;">机器数量</p>
            </div>
            <div class="textNum-mid box1">
                <p style="color: white; font-family:electronicFont;">5 </p>
                <p style="color: white; font-size: 14px;">自动化产线</p>
            </div>
            <div class="textNum-right box1">
                <p style="color: white; font-family:electronicFont;">120 </p>
                <p style="color: white; font-size: 14px;">AGV数量</p>
            </div>
        </div>
        <dv-decoration10 :reverse="true" :color="['#48b59d']" style="width:100%;height:1px;" />
        <div id="mychart" style="width: 100%;height: 100%;"></div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
onMounted(() => {
    const mychart = echarts.init(document.getElementById('mychart'))
    /*************************
pie3D 尝试
使用组件: grid3D、xAxis3D、yAxis3D、zAxis3D、surface

*************************
【 getParametricEquation 函数说明 】 :
*************************
    根据传入的
    startRatio（浮点数）: 当前扇形起始比例，取值区间 [0, endRatio)
    endRatio（浮点数）: 当前扇形结束比例，取值区间 (startRatio, 1]
    isSelected（布尔值）:是否选中，效果参照二维饼图选中效果（单选）
    isHovered（布尔值）: 是否放大，效果接近二维饼图高亮（放大）效果（未能实现阴影）
    
    生成 3D 扇形曲面

*************************
【 getPie3D 函数说明 】 :
*************************
    根据传入的饼图数据，生成模拟 3D 饼图的配置项 option
    
    饼图数据格式示意：
    [{
        name: '数据1',
        value: 10
    }, {
        // 数据项名称
        name: '数据2',
        value : 56,
        itemStyle:{
            // 透明度
            opacity: 0.5,
            // 扇形颜色
            color: 'green'
        }
    }]
    
*************************
【 鼠标事件监听说明 】 :
*************************
    click： 实现饼图的选中效果（单选）
            大致思路是，通过监听点击事件，获取到被点击数据的系列序号 params.seriesIndex，
            然后将对应扇形向外/向内移动 10% 的距离。
            
    mouseover： 近似实现饼图的高亮（放大）效果
            大致思路是，在饼图外部套一层透明的圆环，然后监听 mouseover 事件，获取
            到对应数据的系列序号 params.seriesIndex 或系列名称 params.seriesName，
            如果鼠标移到了扇形上，则先取消高亮之前的扇形（如果有）,再高亮当前扇形；
            如果鼠标移到了透明圆环上，则只取消高亮之前的扇形（如果有），不做任何高亮。
            
    globalout： 当鼠标移动过快，直接划出图表区域时，有可能监听不到透明圆环的 mouseover，
            导致此前高亮没能取消，所以补充了对 globalout 的监听。

        
*************************/

    // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
        // 计算
        let midRatio = (startRatio + endRatio) / 2;

        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        // if (startRatio === 0 && endRatio === 1) {
        //     isSelected = false;
        // }
        isSelected = false;
        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== 'undefined' ? k : 1 / 3;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
            u: {
                min: -Math.PI,
                max: Math.PI * 3,
                step: Math.PI / 32,
            },

            v: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 20,
            },

            x: function (u, v) {
                if (u < startRadian) {
                    return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                if (u > endRadian) {
                    return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            y: function (u, v) {
                if (u < startRadian) {
                    return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                if (u > endRadian) {
                    return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            z: function (u, v) {
                if (u < -Math.PI * 0.5) {
                    return Math.sin(u);
                }
                if (u > Math.PI * 2.5) {
                    return Math.sin(u) * h * 0.1;
                }
                return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
            },
        };
    }

    // 生成模拟 3D 饼图的配置项
    function getPie3D(pieData, internalDiameterRatio) {
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let legendData = [];
        let linesSeries = []; // line3D模拟label指示线
        let k =
            typeof internalDiameterRatio !== 'undefined'
                ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
                : 1 / 3;

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
            sumValue += pieData[i].value;

            let seriesItem = {
                name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
                type: 'surface',
                parametric: true,
                wireframe: {
                    show: false,
                },
                pieData: pieData[i],
                pieStatus: {
                    selected: false,
                    hovered: false,
                    k: 1 / 10,
                },
                itemStyle: {}
            };

            if (typeof pieData[i].itemStyle != 'undefined') {
                let itemStyle = {
                    color: echarts.color,
                    opacity: echarts.number,
                };

                typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
                typeof pieData[i].itemStyle.opacity != 'undefined'
                    ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                    : null;

                seriesItem.itemStyle = itemStyle;
            }
            series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
            endValue = startValue + series[i].pieData.value;

            series[i].pieData.startRatio = startValue / sumValue;
            series[i].pieData.endRatio = endValue / sumValue;
            series[i].parametricEquation = getParametricEquation(
                series[i].pieData.startRatio,
                series[i].pieData.endRatio,
                false,
                false,
                k,
                series[i].pieData.value
            );

            startValue = endValue;

            // 计算label指示线的起始和终点位置
            let midRadian = (series[i].pieData.endRatio + series[i].pieData.startRatio) * Math.PI;
            let posX = Math.cos(midRadian) * (1 + Math.cos(Math.PI / 2));
            let posY = Math.sin(midRadian) * (1 + Math.cos(Math.PI / 2));
            let posZ = Math.log(Math.abs(series[i].pieData.value + 1)) * 0.1;
            let flag = ((midRadian >= 0 && midRadian <= Math.PI / 2) || (midRadian >= 3 * Math.PI / 2 && midRadian <= Math.PI * 2)) ? 1 : -1;
            let color = pieData[i].itemStyle.color;
            let turningPosArr = [posX * (1.8) + (i * 0.1 * flag) + (flag < 0 ? -0.5 : 0), posY * (1.8) + (i * 0.1 * flag) + (flag < 0 ? -0.5 : 0), posZ * (2)]
            let endPosArr = [posX * (1.9) + (i * 0.1 * flag) + (flag < 0 ? -0.5 : 0), posY * (1.9) + (i * 0.1 * flag) + (flag < 0 ? -0.5 : 0), posZ * (6)]
            linesSeries.push({
                type: 'line3D',
                lineStyle: {
                    color: color,
                },
                data: [[posX, posY, posZ], turningPosArr, endPosArr]
            },
                {
                    type: 'scatter3D',
                    label: {
                        show: true,
                        distance: 0,
                        position: 'center',
                        textStyle: {
                            color: 'white',
                            backgroundColor: color,
                            borderWidth: 2,
                            fontSize: 12,
                            padding: 10,
                            borderRadius: 4,
                        },
                        formatter: '{b}'
                    },
                    symbolSize: 0,
                    data: [{ name: series[i].name + '\n' + series[i].pieData.value, value: endPosArr }]
                });

            legendData.push(series[i].name);
        }
        series = series.concat(linesSeries)

        // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
        series.push({
            name: 'mouseoutSeries',
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            itemStyle: {
                opacity: 1,
                color: '#E1E8EC',
            },
            parametricEquation: {
                u: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20,
                },
                v: {
                    min: 0,
                    max: Math.PI,
                    step: Math.PI / 20,
                },
                x: function (u, v) {
                    return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
                },
                y: function (u, v) {
                    return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
                },
                z: function (u, v) {
                    return Math.cos(v) > 0 ? -0.5 : -5;
                },
            },
        });

        // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
        series.push({
            name: 'mouseoutSeries',
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            itemStyle: {
                opacity: 1,
                color: '#E1E8EC',
            },
            parametricEquation: {
                u: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20,
                },
                v: {
                    min: 0,
                    max: Math.PI,
                    step: Math.PI / 20,
                },
                x: function (u, v) {
                    return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
                },
                y: function (u, v) {
                    return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
                },
                z: function (u, v) {
                    return Math.cos(v) > 0 ? -5 : -7;
                },
            },
        });
        series.push({
            name: 'mouseoutSeries',
            type: 'surface',

            parametric: true,
            wireframe: {
                show: false,
            },
            itemStyle: {
                opacity: 1,
                color: '#E1E8EC',
            },
            parametricEquation: {
                u: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20,
                },
                v: {
                    min: 0,
                    max: Math.PI,
                    step: Math.PI / 20,
                },
                x: function (u, v) {
                    return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.2;
                },
                y: function (u, v) {
                    return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.2;
                },
                z: function (u, v) {
                    return Math.cos(v) > 0 ? -7 : -7;
                },
            },
        });

        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        let option = {
            //animation: false,

            legend: {
                show: false,
                //left: '50%',
                //top: 'center',
                textStyle: {
                    fontSize: 10,
                    color: '#89bfe5',
                },
                // icon:'diamond',
                data: legendData,
                formatter: (params) => {
                    return params;
                },
            },
            tooltip: {
                formatter: params => {
                    if (params.seriesName !== 'mouseoutSeries') {
                        return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option.series[params.seriesIndex].pieData.value}`;
                    }
                },
            },
            xAxis3D: {},
            yAxis3D: {},
            zAxis3D: {},
            grid3D: {
                viewControl: {
                    //3d效果可以放大、旋转等，请自己去查看官方配置
                    autoRotateDirection: 'ccw',
                    distant: 1000,
                    // alpha: 40,
                    // beta: 40,
                    rotateSensitivity: 1,
                    zoomSensitivity: 1,
                    panSensitivity: 0,
                    autoRotate: true
                },
                left: 'center',
                width: '100%',
                show: false,
                // boxHeight: 50,
                // boxDepth: 50

            },
            series: series,
        };
        return option;
    }

    // 传入数据生成 option
    let option = getPie3D(
        [
            {
                name: 'ML01',
                value: 134,
                itemStyle: {
                    color: '#99D3F3',
                },
            },
            {
                name: 'ML02',
                value: 56,
                itemStyle: {
                    color: '#007AFF',
                },
            },
            {
                name: 'ML03',
                value: 57,
                itemStyle: {
                    color: '#2acf81',
                },
            },
            {
                name: 'ML04',
                value: 51,
                itemStyle: {
                    color: '#1F9AA7',
                },
            },
            {
                name: 'ML05',
                value: 11,
                itemStyle: {
                    color: '#F5B64C',
                },
            },
        ],
        0.7
    );

    mychart.setOption(option)

})
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;

    .textNum {
        flex: 2;
        display: flex;
    }

    #mychart {
        flex: 8;
    }

    .box1 {
        flex: 1;
        margin: 5px;
        border-radius: 5px;
        background: linear-gradient(to bottom, #007bff1e, rgba(72, 181, 157, 0.7));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 35px;
    }
}
</style>
