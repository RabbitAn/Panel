<template>
    <div id="charts" style="width: 90%;height: 90%;"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
onMounted(() => {
    const charts = echarts.init(document.getElementById('charts'));
    var category = [
        "8:30-9:30",
        "9:30-10:30",
        "10:30-11:30",
        "11:30-12:30",
        "12:30-13:30",
        "13:30-14:30",
        "14:30-15:30",
        "15:30-16:30",
        "16:30-17:30",
        "17:30-18:30",
        "18:30-19:30",
        "19:30-20:30",
    ];
    var dottedBase = [];
    var lineData = [
        18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 56061,
        62677, 59521, 67560, 18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715,
        48444, 50415, 36097, 39867, 44715, 48444, 50415, 50061, 32677, 49521, 32808,
    ];
    var barData = [
        4600, 5000, 5500, 6500, 7500, 8500, 9900, 12500, 14000, 21500, 23200, 24450,
        25250, 33300, 4600, 5000, 5500, 6500, 7500, 8500, 9900, 22500, 14000, 21500,
        8500, 9900, 12500, 14000, 21500, 23200, 24450, 25250, 7500,
    ];
    var rateData = [];
    32808;
    for (var i = 0; i < 33; i++) {
        // var date = i+2001;
        // category.push(date)
        var rate = barData[i] / lineData[i];
        rateData[i] = rate.toFixed(2);
    }

    // option
    let option = {
        grid: {
            top: "5%",
            left: "0%",
            right: "0%",
            bottom: "1%",
            containLabel: true,
        },
        title: {
            text: "增量设备贯通情况-单位",
            x: "center",
            y: 0,
            textStyle: {
                color: "#B4B4B4",
                fontSize: 16,
                fontWeight: "normal",
            },
        },
        center: ["50%", "50%"],
        //  backgroundColor: "#191E40",
        tooltip: {
            trigger: "axis",
            //backgroundColor: "rgba(255,255,255,0.1)",
            axisPointer: {
                type: "shadow",
                label: {
                    show: true,

                    // backgroundColor: "#7B7DDC",
                },
            },
        },
        legend: {
            data: ["已贯通", "计划贯通", "贯通率"],
            textStyle: {
                color: "#B4B4B4",
            },
            top: "7%",
        },
        xAxis: {
            data: category,
            axisLine: {
                lineStyle: {
                    color: "#B4B4B4",
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 10,
                rotate: 45,
                margin: 5,
                color: "#999999",
            },
        },
        yAxis: [
            {
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: "#B4B4B4",
                    },
                },

                axisLabel: {
                    show: false,
                    formatter: "{value} ",
                },
            },
            {
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: "#B4B4B4",
                    },
                },
                axisLabel: {
                    show: false,
                    formatter: "{value} ",
                },
            },
        ],

        series: [
            {
                name: "贯通率",
                type: "line",
                smooth: true,
                showAllSymbol: true,
                symbol: "emptyCircle",
                symbolSize: 8,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: "rgba(72, 181, 157)",
                    },
                },
                data: rateData,
                center: ["50%", "50%"],
            },

            {
                name: "已贯通",
                type: "bar",
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "rgba(72, 181, 157,1)" },
                            { offset: 1, color: "rgba(72, 181, 157,0.1)" },
                        ]),
                    },
                },
                data: barData,
            },

            {
                name: "计划贯通",
                type: "bar",
                barGap: "-100%",
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "rgba(72, 181, 157,0.7)" },
                            { offset: 0.2, color: "rgba(72, 181, 157,0.3)" },
                            { offset: 1, color: "rgba(156,107,211,0)" },
                        ]),
                    },
                },
                z: -12,

                data: lineData,
            },
        ],
    };


    charts.setOption(option);

})
</script>

<style lang="scss" scoped></style>
