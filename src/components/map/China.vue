<template>
    <div id="main" style="height:100%; width: 100%;"></div>
</template>

<script setup lang="js">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import echartsMap from '@/assets/json/china.json'

echarts.registerMap("china", echartsMap);
onMounted(() => {
    const myChart = echarts.init(document.getElementById('main'))

    var geoCoordMap = {
        北京: [116.4551, 40.2539, '北京 5'],
        天津: [117.4219, 39.4189, '天津 14'],
        上海: [121.4648, 31.2891, '上海 19'],
        广州: [113.5107, 23.2196, '广州 11'],
        长春: [125.8154, 44.2584, '长春 4'],
        大连: [122.2229, 39.4409, '大连 3'],
        武汉: [114.3896, 30.6628, '武汉 6'],
        深圳: [114.5435, 22.5439, '深圳 1'],
        重庆: [107.7539, 30.1904, '重庆 7'],
        南京: [118.8062, 31.9208, '南京 9'],
        成都: [103.9526, 30.7617, '成都 7'],
        西安: [109.1162, 34.2004, '西安 3'],
        苏州: [120.6519, 31.3989, '苏州 16'],
        杭州: [119.5313, 29.8773, '杭州 100'],
        郑州: [113.4668, 34.6234, '郑州 10'],
        宁波: [121.5967, 29.6466, '宁波 10'],
        无锡: [120.3442, 31.5527, '无锡 4'],
        青岛: [120.4651, 36.3373, '青岛 10'],
        南昌: [116.0046, 28.6633, '南昌 19'],
        南宁: [108.479, 23.1152, '南宁 9'],
        合肥: [117.29, 32.0581, '合肥 10'],
        石家庄: [114.4995, 38.1006, '石家庄 2'],
        温州: [120.498, 27.8119, '温州 6'],
        兰州: [103.5901, 36.3043, '兰州 4'],
        常州: [119.4543, 31.5582, '常州 9'],
        徐州: [117.5208, 34.3268, '徐州 4'],
        呼和浩特: [111.4124, 40.4901, '呼和浩特 4'],
        洛阳: [112.16, 34.32, '洛阳 10'],
        东莞: [113.8953, 22.901, '东莞'],
        哈尔滨: [127.9688, 45.368, '哈尔滨'],
        厦门: [118.1689, 24.6478, '厦门'],
        昆明: [102.9199, 25.4663, '昆明'],
        芜湖: [119.21, 31.20, '芜湖'],
        福州: [119.4543, 25.9222, '福州'],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        包头: [110.3467, 41.4899],
        北海: [109.314, 21.6211],
        南通: [121.1023, 32.1625],
        台州: [121.1353, 28.6688],
        咸阳: [108.4131, 34.8706],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        日照: [119.2786, 35.5023],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        清远: [112.9175, 24.3292],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        鄂尔多斯: [108.9734, 39.2487],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        韶关: [113.7964, 24.7028]
    };

    var BJData = [
        [{ name: "北京" }, { name: "上海", value: 10 }],
        [{ name: "北京" }, { name: "广州", value: 10 }],
        [{ name: "北京" }, { name: "重庆", value: 50 }],
        [{ name: "北京" }, { name: "呼和浩特", value: 50 }],
    ];

    var TJData = [
        [{ name: "天津" }, { name: "北京", value: 10 }],
        [{ name: "天津" }, { name: "广州", value: 10 }],
        [{ name: "天津" }, { name: "长春", value: 50 }],
        [{ name: "天津" }, { name: "大连", value: 50 }],
        [{ name: "天津" }, { name: "重庆", value: 50 }],
        [{ name: "天津" }, { name: "南京", value: 50 }],
        [{ name: "天津" }, { name: "成都", value: 50 }],
        [{ name: "天津" }, { name: "苏州", value: 50 }],
        [{ name: "天津" }, { name: "郑州", value: 50 }],
        [{ name: "天津" }, { name: "南昌", value: 50 }],
        [{ name: "天津" }, { name: "石家庄", value: 50 }],
        [{ name: "天津" }, { name: "常州", value: 50 }],
        [{ name: "天津" }, { name: "呼和浩特", value: 50 }],
    ];

    var SHData = [
        [{ name: "上海" }, { name: "天津", value: 50 }],
        [{ name: "上海" }, { name: "广州", value: 10 }],
        [{ name: "上海" }, { name: "武汉", value: 50 }],
        [{ name: "上海" }, { name: "重庆", value: 50 }],
        [{ name: "上海" }, { name: "南京", value: 50 }],
        [{ name: "上海" }, { name: "苏州", value: 50 }],
        [{ name: "上海" }, { name: "杭州", value: 100 }],
        [{ name: "上海" }, { name: "宁波", value: 50 }],
        [{ name: "上海" }, { name: "无锡", value: 50 }],
        [{ name: "上海" }, { name: "青岛", value: 50 }],
        [{ name: "上海" }, { name: "南昌", value: 50 }],
        [{ name: "上海" }, { name: "合肥", value: 50 }],
        [{ name: "上海" }, { name: "温州", value: 50 }],
        [{ name: "上海" }, { name: "兰州", value: 50 }],
        [{ name: "上海" }, { name: "常州", value: 50 }],
        [{ name: "上海" }, { name: "徐州", value: 50 }],
        [{ name: "上海" }, { name: "呼和浩特", value: 50 }],
    ];

    var GZData = [
        [{ name: "广州" }, { name: "深圳", value: 50 }],
        [{ name: "广州" }, { name: "重庆", value: 50 }],
        [{ name: "广州" }, { name: "南京", value: 50 }],
        [{ name: "广州" }, { name: "成都", value: 50 }],
        [{ name: "广州" }, { name: "西安", value: 50 }],
        [{ name: "广州" }, { name: "郑州", value: 50 }],
        [{ name: "广州" }, { name: "南昌", value: 50 }],
        [{ name: "广州" }, { name: "南宁", value: 50 }],
    ];

    var CCData = [
        [{ name: "长春" }, { name: "苏州", value: 50 }],
        [{ name: "长春" }, { name: "宁波", value: 50 }],
        [{ name: "长春" }, { name: "南昌", value: 50 }],
        [{ name: "长春" }, { name: "福州", value: 50 }],
    ];

    var DLData = [
        [{ name: "大连" }, { name: "长春", value: 50 }],
        [{ name: "大连" }, { name: "哈尔滨", value: 50 }],
        [{ name: "大连" }, { name: "呼和浩特", value: 50 }],
    ];

    var WHData = [
        [{ name: "武汉" }, { name: "苏州", value: 50 }],
        [{ name: "武汉" }, { name: "无锡", value: 50 }],
        [{ name: "武汉" }, { name: "南昌", value: 50 }],
        [{ name: "武汉" }, { name: "常州", value: 50 }],
    ];

    var SZData = [
    ];

    var CQData = [
        [{ name: "重庆" }, { name: "成都", value: 50 }],
        [{ name: "重庆" }, { name: "郑州", value: 50 }],
        [{ name: "重庆" }, { name: "南昌", value: 50 }],
    ];

    var NJData = [
        [{ name: "南京" }, { name: "苏州", value: 50 }],
        [{ name: "南京" }, { name: "哈尔滨", value: 50 }],
        [{ name: "南京" }, { name: "无锡", value: 50 }],
        [{ name: "南京" }, { name: "南昌", value: 50 }],
        [{ name: "南京" }, { name: "福州", value: 50 }],
        [{ name: "南京" }, { name: "石家庄", value: 50 }],
        [{ name: "南京" }, { name: "常州", value: 50 }],
        [{ name: "南京" }, { name: "洛阳", value: 50 }],
        [{ name: "南京" }, { name: "芜湖", value: 50 }],
    ];

    var CDData = [
        [{ name: "成都" }, { name: "上海", value: 100 }],
        [{ name: "成都" }, { name: "西安", value: 50 }],
        [{ name: "成都" }, { name: "郑州", value: 50 }],
        [{ name: "成都" }, { name: "南昌", value: 50 }],
    ];

    var XAData = [
        [{ name: "西安" }, { name: "郑州", value: 50 }],
    ];

    var SUZData = [
        [{ name: "苏州" }, { name: "郑州", value: 50 }],
        [{ name: "苏州" }, { name: "无锡", value: 50 }],
        [{ name: "苏州" }, { name: "青岛", value: 50 }],
        [{ name: "苏州" }, { name: "南昌", value: 50 }],
        [{ name: "苏州" }, { name: "福州", value: 50 }],
        [{ name: "苏州" }, { name: "南宁", value: 50 }],
        [{ name: "苏州" }, { name: "石家庄", value: 50 }],
        [{ name: "苏州" }, { name: "常州", value: 50 }],
        [{ name: "苏州" }, { name: "洛阳", value: 50 }],
        [{ name: "苏州" }, { name: "芜湖", value: 50 }],
    ];

    var HZData = [
        [{ name: "杭州" }, { name: "南京", value: 50 }],
        [{ name: "杭州" }, { name: "宁波", value: 50 }],
        [{ name: "杭州" }, { name: "合肥", value: 50 }],
        [{ name: "杭州" }, { name: "温州", value: 50 }],
        [{ name: "杭州" }, { name: "徐州", value: 50 }],
    ];

    var ZZData = [
        [{ name: "郑州" }, { name: "无锡", value: 50 }],
        [{ name: "郑州" }, { name: "南昌", value: 50 }],
        [{ name: "郑州" }, { name: "福州", value: 50 }],
        [{ name: "郑州" }, { name: "常州", value: 50 }],
    ];

    var NBData = [
        [{ name: "宁波" }, { name: "南京", value: 50 }],
        [{ name: "宁波" }, { name: "苏州", value: 50 }],
        [{ name: "宁波" }, { name: "无锡", value: 50 }],
        [{ name: "宁波" }, { name: "青岛", value: 50 }],
        [{ name: "宁波" }, { name: "合肥", value: 50 }],
        [{ name: "宁波" }, { name: "厦门", value: 50 }],
        [{ name: "宁波" }, { name: "温州", value: 50 }],
        [{ name: "宁波" }, { name: "常州", value: 50 }],
    ];

    var WXData = [
        [{ name: "无锡" }, { name: "长春", value: 50 }],
        [{ name: "无锡" }, { name: "昆明", value: 50 }],
        [{ name: "无锡" }, { name: "哈尔滨", value: 50 }],
        [{ name: "无锡" }, { name: "南昌", value: 50 }],
        [{ name: "无锡" }, { name: "福州", value: 50 }],
        [{ name: "无锡" }, { name: "南宁", value: 50 }],
        [{ name: "无锡" }, { name: "石家庄", value: 50 }],
        [{ name: "无锡" }, { name: "厦门", value: 50 }],
        [{ name: "无锡" }, { name: "常州", value: 50 }],
        [{ name: "无锡" }, { name: "洛阳", value: 50 }],
    ];

    var QDData = [
        [{ name: "青岛" }, { name: "南京", value: 50 }],
        [{ name: "青岛" }, { name: "哈尔滨", value: 50 }],
        [{ name: "青岛" }, { name: "无锡", value: 50 }],
        [{ name: "青岛" }, { name: "南昌", value: 50 }],
        [{ name: "青岛" }, { name: "石家庄", value: 50 }],
        [{ name: "青岛" }, { name: "常州", value: 50 }],
        [{ name: "青岛" }, { name: "洛阳", value: 50 }],
    ];

    var NCData = [
        [{ name: "南昌" }, { name: "哈尔滨", value: 50 }],
        [{ name: "南昌" }, { name: "福州", value: 50 }],
        [{ name: "南昌" }, { name: "东莞", value: 50 }],
        [{ name: "南昌" }, { name: "南宁", value: 50 }],
        [{ name: "南昌" }, { name: "石家庄", value: 50 }],
        [{ name: "南昌" }, { name: "常州", value: 50 }],
        [{ name: "南昌" }, { name: "洛阳", value: 50 }],
    ];

    var NNData = [
        [{ name: "南宁" }, { name: "武汉", value: 50 }],
        [{ name: "南宁" }, { name: "南京", value: 50 }],
        [{ name: "南宁" }, { name: "常州", value: 50 }],
        [{ name: "南宁" }, { name: "洛阳", value: 50 }],
    ];

    var HFData = [
        [{ name: "合肥" }, { name: "南京", value: 50 }],
        [{ name: "合肥" }, { name: "苏州", value: 50 }],
        [{ name: "合肥" }, { name: "无锡", value: 50 }],
        [{ name: "合肥" }, { name: "青岛", value: 50 }],
        [{ name: "合肥" }, { name: "厦门", value: 50 }],
        [{ name: "合肥" }, { name: "温州", value: 50 }],
        [{ name: "合肥" }, { name: "徐州", value: 50 }],
    ];

    var SJZData = [
        [{ name: "石家庄" }, { name: "呼和浩特", value: 50 }],
    ];

    var WZData = [
        [{ name: "温州" }, { name: "南京", value: 50 }],
        [{ name: "温州" }, { name: "苏州", value: 50 }],
    ];

    var LZData = [
        [{ name: "兰州" }, { name: "杭州", value: 50 }],
        [{ name: "兰州" }, { name: "宁波", value: 50 }],
        [{ name: "兰州" }, { name: "徐州", value: 50 }],
    ];

    var CZData = [
        [{ name: "常州" }, { name: "哈尔滨", value: 50 }],
        [{ name: "常州" }, { name: "福州", value: 50 }],
        [{ name: "常州" }, { name: "洛阳", value: 50 }],
    ];

    var XZData = [
        [{ name: "徐州" }, { name: "宁波", value: 50 }],
    ];

    var HHHTData = [
        [{ name: "呼和浩特" }, { name: "石家庄", value: 50 }],
    ];

    var LYData = [
        [{ name: "洛阳" }, { name: "长春", value: 50 }],
        [{ name: "洛阳" }, { name: "武汉", value: 50 }],
        [{ name: "洛阳" }, { name: "哈尔滨", value: 50 }],
        [{ name: "洛阳" }, { name: "石家庄", value: 50 }],
    ];

    var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
    var convertData = function (data, num) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];

            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value,
                });
            }
        }
        return res;
    };
    var color = [
        "#FF0000",
        "#FF1100",
        "#FF2211",
        "#FF3322",
        "#FF4433",
        "#FF5544",
        "#FF6655",
        "#FF7766",
        "#FF8877",
        "#FF9988",
        "#FFAA99",
        "#FFBBAA",
        "#FFCCBB",
        "#FFDCDC",
        "#FFEEEE",
        "#FFFEFE",
        "#E6FFFF",
        "#CCFFFF",
        "#B3FFFF",
        "#99FFFF",
        "#7FFFFF",
        "#66CCFF",
        "#55BBFF",
        "#44AAFF",
        "#3399FF",
        "#2288FF",
        "#1177FF",
        "#0066FF",
        "#0000FF"
    ]; //航线的颜色
    var series = [];
    [
        ["北京", BJData],
        ["天津", TJData],
        ["上海", SHData],
        ["广州", GZData],
        ["长春", CCData],
        ["大连", DLData],
        ["武汉", WHData],
        // ["深圳", SZData],
        ["重庆", CQData],
        ["南京", NJData],
        ["成都", CDData],
        ["西安", XAData],
        ["苏州", SUZData],
        ["杭州", HZData],
        ["郑州", ZZData],
        ["宁波", NBData],
        ["无锡", WXData],
        ["青岛", QDData],
        ["南昌", NCData],
        ["南宁", NNData],
        ["合肥", HFData],
        ["石家庄", SJZData],
        ["温州", WZData],
        ["兰州", LZData],
        ["常州", CZData],
        ["徐州", XZData],
        ["呼和浩特", HHHTData],
        ["洛阳", LYData],
    ].forEach(function (item, i) {
        series.push(
            {
                name: item[0] + " Top3",
                type: "lines",
                zlevel: 1,
                symbol: ["none", "arrow"],
                symbolSize: 0.1,//目标箭头图标大小
                effect: {
                    // show: true,
                    // period: 6,
                    // trailLength: 0,
                    // symbol: planePath,
                    // symbolSize: 15
                    show: true,
                    period: 4, //箭头指向速度，值越小速度越快
                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    symbol: 'arrow', //箭头图标
                    symbolSize: 2, //图标大小
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0.1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1], item[2])
            },
            {
                name: item[0] + " Top3",
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    brushType: "stroke"
                },
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        formatter: "{@[3]}",
                        fontSize: 13
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    },
                    emphasis: {
                        areaColor: "#2B91B7"
                    }
                },
                data: item[1].map(function (dataItem) {
                    let value = dataItem[1].value;
                    var dataItem = [...geoCoordMap[dataItem[1].name]];
                    let jw = dataItem.slice(0, 2).concat([value]).concat(dataItem.slice(2))

                    return {
                        name: dataItem[1].name,
                        value: jw
                    };
                })
            }
        );
    });
    var option = {
        tooltip: {
            trigger: "item",
            formatter: function (params, ticket, callback) {
                if (params.seriesType == "effectScatter") {
                    return "线路：" + params.data.name + "" + params.data.value[2];
                } else if (params.seriesType == "lines") {
                    return (
                        params.data.fromName +
                        ">" +
                        params.data.toName +
                        "<br />" +
                        params.data.value
                    );
                } else {
                    return params.name;
                }
            }
        },
        // legend: {
        //   orient: "vertical",
        //   top: "bottom",
        //   left: "right",
        //   data: ["西安 Top3", "西宁 Top3", "银川 Top3"],
        //   textStyle: {
        //     color: "#fff"
        //   },
        //   selectedMode: "multiple"
        // },
        geo: {
            map: "china",
            label: {
                emphasis: {
                    show: true,
                    color: "#fff"
                }
            },
            // 把中国地图放大了1.2倍
            zoom: 1.5,
            roam: true,
            //居中显示
            center: [104.114129, 37.550339],
            itemStyle: {
                normal: {
                    areaColor: "#aa8fea",
                    borderColor: "#195BB9",
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: "#2B91B7"
                }
            },
            itemStyle: {
                normal: {
                    // 地图省份的背景颜色
                    areaColor: "transparent",
                    borderColor: "#48b59d",
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: "#2B91B7"
                }
            }
        },
        series: series
    };
    myChart.setOption(option)

})
</script>

<style lang="scss" scoped></style>