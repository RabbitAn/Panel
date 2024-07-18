<template>
    <div id="pyramid-chart" style="height: 100%; width: 100%;"></div>
</template>


<script setup lang="js">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {

    // 基于准备好的dom，初始化echarts实例
    const pyramidChart = echarts.init(document.getElementById('pyramid-chart'));
    let lengthData = [];
    let Lengths = []
    let data = [[], [], [], []]
    let sum = 0
    let arr = []
    let dom = 800;
    let barWidth = dom / 20;
    let JsonData = [
        {
            "FXDJ": "A级",
            "ZTSL": "373",
            "ZTLB": "ML01",
            "TJRQ": "2023-09",
            "ID": "1",
            "JCRWS": "52"
        },
        {
            "FXDJ": "B级",
            "ZTSL": "534",
            "ZTLB": "ML01",
            "TJRQ": "2023-09",
            "ID": "2",
            "JCRWS": "15"
        },
        {
            "FXDJ": "C级",
            "ZTSL": "338",
            "ZTLB": "ML01",
            "TJRQ": "2023-09",
            "ID": "3",
            "JCRWS": "20"
        },
        {
            "FXDJ": "D级",
            "ZTSL": "133",
            "ZTLB": "ML01",
            "TJRQ": "2023-09",
            "ID": "4",
            "JCRWS": "99"
        },
        {
            "FXDJ": "A级",
            "ZTSL": "201",
            "ZTLB": "ML02",
            "TJRQ": "2023-09",
            "ID": "5",
            "JCRWS": "31"
        },
        {
            "FXDJ": "B级",
            "ZTSL": "327",
            "ZTLB": "ML02",
            "TJRQ": "2023-09",
            "ID": "6",
            "JCRWS": "99"
        },
        {
            "FXDJ": "C级",
            "ZTSL": "621",
            "ZTLB": "ML02",
            "TJRQ": "2023-09",
            "ID": "7",
            "JCRWS": "70"
        },
        {
            "FXDJ": "D级",
            "ZTSL": "327",
            "ZTLB": "ML02",
            "TJRQ": "2023-09",
            "ID": "8",
            "JCRWS": "107"
        },
        {
            "FXDJ": "A级",
            "ZTSL": "737",
            "ZTLB": "ML03",
            "TJRQ": "2023-09",
            "ID": "9",
            "JCRWS": "40"
        },
        {
            "FXDJ": "B级",
            "ZTSL": "491",
            "ZTLB": "ML03",
            "TJRQ": "2023-09",
            "ID": "10",
            "JCRWS": "45"
        },
        {
            "FXDJ": "C级",
            "ZTSL": "541",
            "ZTLB": "ML03",
            "TJRQ": "2023-09",
            "ID": "11",
            "JCRWS": "57"
        },
        {
            "FXDJ": "D级",
            "ZTSL": "128",
            "ZTLB": "ML03",
            "TJRQ": "2023-09",
            "ID": "12",
            "JCRWS": "55"
        },
        {
            "FXDJ": "A级",
            "ZTSL": "795",
            "ZTLB": "ML04",
            "TJRQ": "2023-09",
            "ID": "13",
            "JCRWS": "90"
        },
        {
            "FXDJ": "B级",
            "ZTSL": "1056",
            "ZTLB": "ML04",
            "TJRQ": "2023-09",
            "ID": "14",
            "JCRWS": "57"
        },
        {
            "FXDJ": "C级",
            "ZTSL": "181",
            "ZTLB": "ML04",
            "TJRQ": "2023-09",
            "ID": "15",
            "JCRWS": "53"
        },
        {
            "FXDJ": "D级",
            "ZTSL": "204",
            "ZTLB": "ML04",
            "TJRQ": "2023-09",
            "ID": "16",
            "JCRWS": "39"
        },
        {
            "FXDJ": "A级",
            "ZTSL": "446",
            "ZTLB": "ML05",
            "TJRQ": "2023-09",
            "ID": "17",
            "JCRWS": "54"
        },
        {
            "FXDJ": "B级",
            "ZTSL": "791",
            "ZTLB": "ML05",
            "TJRQ": "2023-09",
            "ID": "18",
            "JCRWS": "84"
        },
        {
            "FXDJ": "C级",
            "ZTSL": "607",
            "ZTLB": "ML05",
            "TJRQ": "2023-09",
            "ID": "19",
            "JCRWS": "86"
        },
        {
            "FXDJ": "D级",
            "ZTSL": "831",
            "ZTLB": "ML05",
            "TJRQ": "2023-09",
            "ID": "20",
            "JCRWS": "94"
        }
    ]

    for (let item of JsonData) {
        // x轴数据
        if (!lengthData.some(t => t === item.ZTLB)) {
            lengthData.push(item.ZTLB);
        }
        // 图例数据
        if (!Lengths.some(t => t === item.FXDJ)) {
            Lengths.push(item.FXDJ);
        }
    }
    Lengths.forEach((e, j) => {
        JsonData.forEach((k, i) => {
            lengthData.forEach((m, n) => {

                if (m == k.ZTLB && e == k.FXDJ) {
                    data[j][n] = k.ZTSL
                }
            })
        })
    })

    let xData = lengthData.map((item, index) => {
        return {
            value: item,
        };
    });

    let colors = [{
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#48b59d'
        }, {
            offset: 0.5,
            color: '#48b59d'
        }, {
            offset: 0.5,
            color: '#48b59d'
        }, {
            offset: 1,
            color: '#48b59d'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#602CFF'
        }, {
            offset: 0.5,
            color: '#602CFF'
        }, {
            offset: 0.5,
            color: '#4915E6'
        }, {
            offset: 1,
            color: '#4915E6'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#48b59d'
        }, {
            offset: 0.5,
            color: '#48b59d'
        }, {
            offset: 0.5,
            color: '#48b59d'
        }, {
            offset: 1,
            color: '#48b59d'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#89FF5E'
        }, {
            offset: 0.5,
            color: '#89FF5E'
        }, {
            offset: 0.5,
            color: '#48DD12'
        }, {
            offset: 1,
            color: '#48DD12'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#FFD05C'
        }, {
            offset: 0.5,
            color: '#FFD05C'
        }, {
            offset: 0.5,
            color: '#DEA821'
        }, {
            offset: 1,
            color: '#DEA821'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#FF7853'
        }, {
            offset: 0.5,
            color: '#FF7853'
        }, {
            offset: 0.5,
            color: '#DB3E13'
        }, {
            offset: 1,
            color: '#DB3E13'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#AA48FF'
        }, {
            offset: 0.5,
            color: '#AA48FF'
        }, {
            offset: 0.5,
            color: '#8E15F8'
        }, {
            offset: 1,
            color: '#8E15F8'
        }]
    }
    ];
    let option = {
        //提示框
        tooltip: {
            show: true,
            trigger: "axis", //axis , item
            backgroundColor: "RGBA(0, 49, 85, 0.5)",
            borderColor: "rgba(0, 151, 251, 0)",
            borderWidth: 1,
            borderRadius: 0,
            textStyle: {
                color: "#BCE9FC",
                fontSize: 14,
                align: "left",
            },
            confine: true,
            // formatter(e,i){
            //     console.log(e,i)
            // },
        },
        /**区域位置*/
        grid: {
            left: '6%',
            right: '4%',
            top: 30,
            bottom: 60,
        },
        /**图例大小*/
        legend: {
            data: Lengths,
            textStyle: {
                color: '#BFEBFF',
                fontSize: 14,
            },
            itemHeight: 16,
            itemWidth: 4,
            right: '10%',
            top: 10,
            itemGap: 30,
        },
        //X轴
        xAxis: {
            data: xData,
            axisLabel: {
                margin: 20,
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                textStyle: {
                    color: "#9297a5",
                    fontStyle: "normal",
                    fontSize: 10,
                },
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#9297a5",
                },
            },
            splitLine: {
                //坐标轴在 grid 区域中的分隔线。
                show: false,
                lineStyle: {
                    color: "rgba(77, 128, 254, 0.2)",
                },
            },
            axisTick: {
                //坐标轴刻度相关设置。
                show: false,
            },
        },
        yAxis: {
            name: "单位：个",
            nameTextStyle: {
                fontSize: 8,
                color: "#BFEBFF",
            },
            show: false,
            splitNumber: 4,
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#BFEBFF",
                },
            },
            splitLine: {
                //坐标轴在 grid 区域中的分隔线。
                show: false,
                lineStyle: {
                    color: "rgba(77, 128, 254, 0.2)",
                },
            },
            axisLabel: {
                //坐标轴刻度标签的相关设置。
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                textStyle: {
                    color: "#BFEBFF",
                    fontStyle: "normal",
                    fontSize: 8,
                },
            },
            axisTick: {
                //坐标轴刻度相关设置。
                show: false,
            },
        },
        series: [
            {
                //图例一底部底片
                z: 2,
                type: 'pictorialBar',
                data: data[0],
                symbol: 'diamond',
                symbolOffset: [0, '50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colors[0];
                        },
                    }
                },
                tooltip: {
                    show: false,
                },
            },
            {
                //图例一顶部底片
                z: 3,
                type: 'pictorialBar',
                symbolPosition: 'end',
                data: data[0],
                symbol: 'diamond',
                symbolOffset: [0, '-50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        color: function (params) {
                            return colors[0].colorStops[0].color;
                        },

                    }
                },
                tooltip: {
                    show: false,
                },
            },
        ],
    };
    data.forEach((e, i) => {
        arr.push(e)
        if (sum < i) {
            sum++
            option.series.push(
                {
                    //图例二顶部底片
                    z: 3,
                    type: 'pictorialBar',
                    symbolPosition: 'end',
                    data: addArray(arr),
                    symbol: 'diamond',
                    symbolOffset: [0, '-50%'],
                    symbolSize: [barWidth, barWidth * 0.5],
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                return colors[i].colorStops[0].color;
                            },

                        }
                    },
                    tooltip: {
                        show: false,
                    },
                }
            )
        }
        option.series.push(
            {
                type: 'bar',
                name: Lengths[i],
                barWidth: barWidth,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colors[i];
                        }
                    },

                },
                stack: '1',
                data: e,

            }
        )
    })
    function addArray(arr) {
        let result = []
        for (let i = 0; i < arr.length; i++) {
            arr[i].forEach((value, index) => {
                if (result[index] == null || result[index] == "") {
                    result[index] = 0;
                }
                result[index] += parseInt(value);
            })
        }
        return result
    }

    pyramidChart.setOption(option);

})
</script>
