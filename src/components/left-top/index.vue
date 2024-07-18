<template>
    <div id="mainch" style="height:100%; width: 100%;"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'


onMounted(() => {
    const mainc = echarts.init(document.getElementById('mainch'))
    var data = [
        {
            "name": "ML01",
            "value": 954
        },
        {
            "name": "ML02",
            "value": 1337
        },
        {
            "name": "ML03",
            "value": 1593
        },
        {
            "name": "ML04",
            "value": 1827
        },
        {
            "name": "ML05",
            "value": 1918
        },

    ],
        names = [], values = [];
    data.forEach((item, index) => {
        names.push(item.name);
        values.push(item.value);
    })

    let option = {
        backgroundColor: "transparent",
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: 20,
            right: 30,
            top: 10,
            bottom: 20,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            splitNumber: 3,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false,
                textStyle: {
                    color: "#9297a5",
                    fontSize: 10
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: names,
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                interval: 0,
                // rotate: 30,
                textStyle: {
                    color: "#9297a5",
                    fontSize: 10
                }
            },
            splitLine: {
                show: false
            }
        },
        series: [{
            type: 'bar',
            showBackground: true,

            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            },
            itemStyle: {
                borderRadius: 10,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,

                    colorStops: [
                        { offset: 0, color: "transparent" },
                        { offset: 1, color: "#48b59d" }, // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                }
            },
            label: {
                show: true,
                position: 'right',
                color: '#fff',
                fontSize: 10
            },
            data: values
        }]
    }
    mainc.setOption(option)
})
</script>

<style lang="scss" scoped></style>
