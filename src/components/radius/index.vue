<template>
    <div style="display: flex; flex-direction: row; height: 100%;width: 100%;">
        <div id="mainPie" style="flex: 1; width: 100%;height: 100%;"></div>
        <div id="mainBar" style=" flex: 2; width: 100%;height: 100%;"></div>
    </div>

</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
    const myChart = echarts.init(document.getElementById('mainPie'))
    const barChart = echarts.init(document.getElementById('mainBar'))
    //#region myChart
    let option = null;
    let data = [{
        name: "验收总数",
        value: 754
    },
    {
        name: "申报总数",
        value: 611
    },
    {
        name: "推荐总数",
        value: 400
    }
    ];
    let arrName = getArrayValue(data, "name");
    let arrValue = getArrayValue(data, "value");
    let sumValue = eval(arrValue.join('+'));
    let objData = array2obj(data, "name");//alert(JSON.stringify(objData))
    let optionData = getData(data);
    function getArrayValue(array, key) {
        var key = key || "value";
        var res = [];
        if (array) {
            array.forEach(function (t) {
                res.push(t[key]);
            });
        }
        return res;
    }

    function array2obj(array, key) {
        var resObj = {};
        for (var i = 0; i < array.length; i++) {
            resObj[array[i][key]] = array[i];
        }
        return resObj;
    }

    function getData(data) {
        var res = {
            series: [],
            yAxis: []
        };
        for (let i = 0; i < data.length; i++) {
            // alert(-50 * (i + 1))
            res.series.push({
                name: '',
                type: 'pie',
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                radius: [60 - i * 15 + '%', 55 - i * 15 + '%'],
                startAngle: -90 * i, //起始角度
                center: ["50%", "55%"],
                label: {
                    show: true,
                    lineHeight: 10,
                    formatter: '{b}\n\n{d}%',
                    padding: [0, -5, -5, -6],
                    textStyle: {
                        fontSize: 10,
                        color: "#c4cfff",
                    },
                },
                labelLine: {
                    show: true,
                    length: 20,
                    length2: 20
                },
                itemStyle: {
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 5,
                },
                data: [{
                    value: data[i].value,
                    name: data[i].name
                }, {
                    value: sumValue - data[i].value,
                    name: '',
                    itemStyle: {
                        color: "rgba(0,0,0,0)",
                        borderWidth: 0
                    },
                    label: {
                        show: false
                    },
                    tooltip: {
                        show: false
                    },
                    hoverAnimation: false
                }]
            });
            res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
        }
        return res;
    }

    option = {
        backgroundColor: 'transparent',
        grid: {
            top: '2%',
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true
        },
        legend: {
            show: false,
            icon: "rect", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
            top: '20%',
            right: "2%",
            data: arrName,
            itemWidth: 17,
            itemHeight: 8,
            padding: [0, 16],
            itemGap: 10,
            orient: 'vertical',
            formatter: function (name) {
                return "{title|" + name + "}{value|" + (objData[name].value) + "}{title|项}"
            },

            textStyle: {
                rich: {
                    title: {
                        fontSize: 14,
                        lineHeight: 25,
                        color: "#c4cfff"
                    },
                    value: {
                        fontSize: 14,
                        lineHeight: 20,
                        color: "rgb(0, 178, 246)"
                    }
                }
            },
        },
        tooltip: {
            show: false,
            trigger: "item",
            formatter: "{a}<br>{b}:{c}({d}%)",

        },
        color: ['#fc05f4', '#33d7d9', '#703bfd'],
        xAxis: [{
            show: false
        }],
        series: optionData.series
    };
    myChart.setOption(option)
    //#endregion
    //#region barChart


    let xaxisData = ["ML01", "ML02", "ML03", "ML04", "ML05"];
    let yaxisData = [90, 80, 100, 70, 65, 69, 80, 100, 70, 65, 69, 66];
    let yaxisData2 = yaxisData.map((item) => {
        return item * 2
    })


    const offsetX = 10;
    const offsetY = 5;
    // 绘制左侧面
    let dom = 800;
    let barWidth = dom / 20;
    const CubeLeft = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            // 会canvas的应该都能看得懂，shape是从custom传入的
            const xAxisPoint = shape.xAxisPoint;
            const c0 = [shape.x, shape.y];
            const c1 = [shape.x - offsetX, shape.y - offsetY];
            const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
            const c3 = [xAxisPoint[0], xAxisPoint[1]];
            ctx
                .moveTo(c0[0], c0[1])
                .lineTo(c1[0], c1[1])
                .lineTo(c2[0], c2[1])
                .lineTo(c3[0], c3[1])
                .closePath();
        },
    });

    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const xAxisPoint = shape.xAxisPoint;
            const c1 = [shape.x, shape.y];
            const c2 = [xAxisPoint[0], xAxisPoint[1]];
            const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
            const c4 = [shape.x + offsetX, shape.y - offsetY];
            ctx
                .moveTo(c1[0], c1[1])
                .lineTo(c2[0], c2[1])
                .lineTo(c3[0], c3[1])
                .lineTo(c4[0], c4[1])
                .closePath();
        },
    });

    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const c1 = [shape.x, shape.y];
            const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
            const c3 = [shape.x, shape.y - offsetX];
            const c4 = [shape.x - offsetX, shape.y - offsetY];
            ctx
                .moveTo(c1[0], c1[1])
                .lineTo(c2[0], c2[1])
                .lineTo(c3[0], c3[1])
                .lineTo(c4[0], c4[1])
                .closePath();
        },
    });

    // 注册三个面图形
    echarts.graphic.registerShape("CubeLeft", CubeLeft);
    echarts.graphic.registerShape("CubeRight", CubeRight);
    echarts.graphic.registerShape("CubeTop", CubeTop);

    option = {
        backgroundColor: "transparent",
        tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            backgroundColor: "rgba(255,255,255,0.75)",
            extraCssText: "box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.3);",
            textStyle: {
                fontSize: 14,
                color: "#000",
            },
            formatter: (params, ticket, callback) => {
                const item = params[1];
                return item.name + " : " + item.value + " 个";
            },
        },
        grid: {
            left: "1%",
            right: "0%",
            top: "16%",
            bottom: "5%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: xaxisData,
            axisLine: {
                show: false,
                lineStyle: {
                    width: 1,
                    color: "#545454",
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 10,
                rotate: 0,
                margin: 5,
                color: "#999999",
            },
        },
        yAxis: {
            show: false,
            type: "value",
            name: "单位：个",
            nameTextStyle: {
                color: "#9ea1a9",
                fontWeight: 400,
                fontSize: 10,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: "#545454",
                },
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
                fontSize: 10,
                color: "#999999",
            },
        },
        series: [
            {
                type: 'bar',
                stack: 'ttt',
                barWidth: barWidth,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#48b59d',
                            },
                            {
                                offset: 1,
                                color: 'transparent',
                            },
                        ])
                    }
                },

                data: yaxisData
            },
            {
                type: 'bar',
                stack: 'ttt',
                barWidth: barWidth,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#48b59f',
                            },
                            {
                                offset: 1,
                                color: '#9E2FFD10',
                            },
                        ]),
                    }
                },

                data: yaxisData
            },
            // 最底下
            {
                z: 2,
                type: 'pictorialBar',
                data: yaxisData,
                symbol: 'diamond',
                symbolOffset: [0, '50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        color: '#2FCAFD00'
                    }
                },
            },
            {
                z: 3,
                type: 'pictorialBar',
                symbolPosition: 'end',
                data: yaxisData,
                symbol: 'diamond',
                symbolOffset: [0, '-50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#3FA1FB',
                            },
                            {
                                offset: 1,
                                color: '#41B4F8',
                            },
                        ])

                    }
                },
            },
            {
                z: 3,
                type: 'pictorialBar',
                symbolPosition: 'end',
                data: yaxisData2,
                symbol: 'diamond',
                symbolOffset: [0, '-50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#886DF8',
                            },
                            {
                                offset: 1,
                                color: '#4781F0',
                            },
                        ]),

                    }
                },
            },
        ],
    };
    barChart.setOption(option)
    //#endregion

})
</script>

<style lang="scss" scoped></style>
