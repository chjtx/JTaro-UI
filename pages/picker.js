import '../components/picker/picker.js'
import '../components/body/body.js'
import header from './parts/sub-page-header.js'
import html from './picker.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      value: ['广东省', '广州市', '天河区'],
      address: [{
        name: '北京市',
        children: [{
          name: '北京市',
          children: [{
            name: '东城区'
          }, {
            name: '西城区'
          }, {
            name: '崇文区'
          }, {
            name: '宣武区'
          }, {
            name: '朝阳区'
          }, {
            name: '丰台区'
          }, {
            name: '石景山区'
          }, {
            name: '海淀区'
          }, {
            name: '门头沟区'
          }, {
            name: '房山区'
          }, {
            name: '通州区'
          }, {
            name: '顺义区'
          }, {
            name: '昌平区'
          }, {
            name: '大兴区'
          }, {
            name: '怀柔区'
          }, {
            name: '平谷区'
          }, {
            name: '密云县'
          }, {
            name: '延庆县'
          }]
        }]
      }, {
        name: '天津市',
        children: [{
          name: '天津市',
          children: [{
            name: '和平区'
          }]
        }]
      }, {
        name: '河北省',
        children: [{
          name: '石家庄市',
          children: [{
            name: '长安区'
          }]
        }]
      }, {
        name: '山西省',
        children: [{
          name: '太原市',
          children: [{
            name: '杏花岭区'
          }]
        }]
      }, {
        name: '内蒙古自治区',
        children: [{
          name: '呼和浩特市',
          children: [{
            name: '新城区'
          }]
        }]
      }, {
        name: '辽宁省',
        children: [{
          name: '沈阳市',
          children: [{
            name: '皇姑区'
          }]
        }]
      }, {
        name: '吉林省',
        children: [{
          name: '延边朝鲜族自治州',
          children: [{
            name: '延吉市'
          }]
        }]
      }, {
        name: '黑龙江省',
        children: [{
          name: '齐齐哈尔市',
          children: [{
            name: '龙沙区'
          }]
        }]
      }, {
        name: '上海市',
        children: [{
          name: '上海市',
          children: [{
            name: '黄浦区'
          }]
        }]
      }, {
        name: '江苏省',
        children: [{
          name: '无锡市',
          children: [{
            name: '崇安区'
          }]
        }]
      }, {
        name: '浙江省',
        children: [{
          name: '杭州市',
          children: [{
            name: '拱墅区'
          }]
        }]
      }, {
        name: '安徽省',
        children: [{
          name: '蚌埠市',
          children: [{
            name: '蚌山区'
          }]
        }]
      }, {
        name: '福建省',
        children: [{
          name: '福州市',
          children: [{
            name: '仓山区'
          }]
        }]
      }, {
        name: '江西省',
        children: [{
          name: '南昌市',
          children: [{
            name: '东湖区'
          }]
        }]
      }, {
        name: '山东省',
        children: [{
          name: '济南市',
          children: [{
            name: '市中区'
          }]
        }]
      }, {
        name: '河南省',
        children: [{
          name: '开封市',
          children: [{
            name: '通许县'
          }]
        }]
      }, {
        name: '湖北省',
        children: [{
          name: '十堰市',
          children: [{
            name: '茅箭区'
          }]
        }]
      }, {
        name: '湖南省',
        children: [{
          name: '长沙市',
          children: [{
            name: '岳麓区'
          }]
        }]
      }, {
        name: '广东省',
        children: [{
          name: '广州市',
          children: [{
            name: '东山区'
          }, {
            name: '荔湾区'
          }, {
            name: '越秀区'
          }, {
            name: '海珠区'
          }, {
            name: '天河区'
          }, {
            name: '芳村区'
          }, {
            name: '白云区'
          }, {
            name: '黄埔区'
          }, {
            name: '番禺区'
          }, {
            name: '花都区'
          }, {
            name: '增城市'
          }, {
            name: '从化市'
          }]
        }, {
          name: '韶关市',
          children: [{
            name: '翁源县'
          }]
        }, {
          name: '深圳市',
          children: [{
            name: '罗湖区'
          }]
        }, {
          name: '珠海市',
          children: [{
            name: '香洲区'
          }]
        }, {
          name: '汕头市',
          children: [{
            name: '龙湖区'
          }]
        }, {
          name: '佛山市',
          children: [{
            name: '禅城区'
          }]
        }, {
          name: '江门市',
          children: [{
            name: '蓬江区'
          }]
        }, {
          name: '湛江市',
          children: [{
            name: '赤坎区'
          }]
        }, {
          name: '茂名市',
          children: [{
            name: '茂南区'
          }]
        }, {
          name: '肇庆市',
          children: [{
            name: '广宁县'
          }]
        }, {
          name: '惠州市',
          children: [{
            name: '惠城区'
          }]
        }, {
          name: '梅州市',
          children: [{
            name: '大埔县'
          }]
        }, {
          name: '汕尾市',
          children: [{
            name: '海丰县'
          }]
        }, {
          name: '河源市',
          children: [{
            name: '源城区'
          }]
        }, {
          name: '阳江市',
          children: [{
            name: '江城区'
          }]
        }, {
          name: '清远市',
          children: [{
            name: '清城区'
          }, {
            name: '连山壮族瑶族自治县'
          }]
        }, {
          name: '东莞市',
          children: [{
            name: '虎门镇'
          }]
        }, {
          name: '中山市',
          children: [{
            name: '小榄镇'
          }]
        }, {
          name: '潮州市',
          children: [{
            name: '湘桥区'
          }]
        }, {
          name: '揭阳市',
          children: [{
            name: '榕城区'
          }]
        }, {
          name: '云浮市',
          children: [{
            name: '云城区'
          }]
        }]
      }, {
        name: '广西壮族自治区',
        children: [{
          name: '南宁市',
          children: [{
            name: '马山县'
          }]
        }]
      }, {
        name: '海南省',
        children: [{
          name: '海口市'
        }]
      }, {
        name: '重庆市',
        children: [{
          name: '重庆市'
        }]
      }, {
        name: '四川省',
        children: [{
          name: '成都市'
        }]
      }, {
        name: '贵州省',
        children: [{
          name: '黔西南布依族苗族自治州'
        }]
      }, {
        name: '云南省',
        children: [{
          name: '红河哈尼族彝族自治州'
        }]
      }, {
        name: '西藏自治区',
        children: [{
          name: '拉萨市'
        }]
      }, {
        name: '陕西省',
        children: [{
          name: '宝鸡市'
        }]
      }, {
        name: '甘肃省',
        children: [{
          name: '兰州市'
        }]
      }, {
        name: '青海省',
        children: [{
          name: '西宁市'
        }]
      }, {
        name: '宁夏回族自治区',
        children: [{
          name: '银川市'
        }]
      }, {
        name: '新疆维吾尔自治区',
        children: [{
          name: '克孜勒苏柯尔克孜自治州'
        }]
      }, {
        name: '香港特别行政区',
        children: [{
          name: '香港特别行政区'
        }]
      }, {
        name: '澳门特别行政区',
        children: [{
          name: '澳门特别行政区'
        }]
      }, {
        name: '台湾省',
        children: [{
          name: '台北市'
        }]
      }]
    }
  }
}
