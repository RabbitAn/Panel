<template>
    <div id="chart" style="height: 100%;width: 100%;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
onMounted(() => {
    const mainchart = echarts.init(document.getElementById('chart'))
    let legendData = ['计划产出', '实际产出'];
    let xAxisData = ['ML01', 'ML02', 'ML03', 'ML04', 'ML05']
    let seriesData = [355, 330, 290, 233, 205, 321]
    let seriesData1 = [299, 304, 359, 410]

    let option = {


        backgroundColor: "transparent",
        tooltip: {
            show: false,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // //图表居中显示
        // center: {
        //     x: '50%',
        //     y: '50%'
        // },
        grid: {
            top: '2%',
            left: '2%',
            right: '10%',
            bottom: '5%',
            containLabel: true
        },
        legend: {
            icon: 'rect',
            right: "center",
            top: '2%',
            itemWidth: 7, // 设置宽度
            itemHeight: 7, // 设置高度
            itemGap: 15, // 设置间距
            textStyle: { //图例文字的样式
                color: '#89BFE5',
                fontSize: 12
            }
        },
        xAxis: {
            boundaryGap: true,
            data: xAxisData,
            axisLine: {
                lineStyle: {
                    color: "rgba(117, 168, 202, 0.4)"
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#9ea1a9'
            }
        },
        yAxis: [{
            // name: '单位：个',
            // type: "value",
            inverse: false,
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(117, 168, 202, 0.3)',
                    type: 'dashed'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0A5C95"
                }
            },
            axisLabel: {
                show: false,
                formatter: "{value}",
                textStyle: {
                    color: '#89BFE5',
                    fontSize: 12
                }
            },
            nameTextStyle: {
                color: '#89BFE5',
                padding: [0, 0, 0, 15],
                fontSize: 12
            },
            axisTick: {
                show: false
            }
        }],
        series: [
            {
                name: legendData[0],
                type: "line",
                symbol: 'circle', //设定为实心点
                showAllSymbol: true,
                symbolSize: 5,
                smooth: true,
                label: {
                    show: true,
                    position: 'top',
                    color: '#fff',
                },
                itemStyle: {
                    normal: {
                        color: `#2BDFD4`,
                        lineStyle: { //线的颜色
                            color: `#2BDFD4`,
                            width: 1.5
                        },
                        areaStyle: {
                            //type: 'default',
                            //旧版渐变色实现
                            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, //变化度
                            //    //三种由深及浅的颜色
                            //    [{
                            //       offset: 0,
                            //       color: 'rgba(1, 180, 255, 0.2)'
                            //    }, {
                            //       offset: 1,
                            //       color: 'rgba(1, 180, 255, 0.1)'
                            //    }])

                            //新版渐变色实现
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(1, 180, 255, 0.2)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(1, 180, 255, 0.1)'
                                    }
                                ]
                            }
                        },
                    }
                },
                data: seriesData
            },
            {
                name: legendData[1],
                type: "line",
                symbol: 'circle', //设定为实心点
                showAllSymbol: true,
                symbolSize: 5,
                smooth: true,
                label: {
                    show: true,
                    position: 'top',
                    color: '#fff',
                },
                itemStyle: {
                    normal: {
                        color: `#FFD076`,
                        lineStyle: { //线的颜色
                            color: `#FFD076`,
                            width: 1.5
                        },
                        areaStyle: {
                            //旧版渐变色实现
                            // type: 'default',                 
                            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, //变化度
                            //    //三种由深及浅的颜色
                            //    [{
                            //       offset: 0,
                            //       color: 'rgba(255, 223, 4, 0.2)'
                            //    }, {
                            //       offset: 1,
                            //       color: 'rgba(255, 223, 4, 0.1)'
                            //    }])
                            //新版渐变色实现
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(255, 223, 4, 0.2)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255, 223, 4, 0.1)'
                                    }
                                ]
                            }
                        },
                    }
                },
                data: seriesData1
            }
        ]
    };

    mainchart.setOption(option)
})
</script>

<style lang="scss" scoped></style>
