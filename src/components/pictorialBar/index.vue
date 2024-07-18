<template>
    <div id="mainchart" style="height: 100%;width: 100%;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts';
onMounted(() => {
    const mainchart = echarts.init(document.getElementById('mainchart'));
    let option = {
        backgroundColor: "transparent",

        grid: {
            top: 20,
            left: 35,
            right: 10,
            bottom: 20
        },
        xAxis: {
            type: 'category',
            axisTick: false,
            axisLabel: {

                interval: 0,
                color: '#9297a5',
                fontSize: 10
            },
            data: ['数据1', '数据2', '数据3', '数据3', '数据5']
        },
        yAxis: {
            type: 'value',
            interval: 100,
            splitLine: false,
            axisLabel: {
                color: '#9297a5',
                fontSize: 10,
                show: false,
            }
        },
        series: [
            {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: '#347CDD' }, // 0% 处的颜色
                        { offset: 1, color: '#56fb93' } // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                },
                data: [80, 200, 150, 180, 250],
                type: "pictorialBar",
                symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
                label: {
                    show: true,
                    color: '#fff',
                    position: 'top'
                }
            }
        ]
    }
    mainchart.setOption(option);
})
</script>

<style lang="scss" scoped></style>
