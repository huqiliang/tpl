<template>
  <div>
    {{ search }}
    <!-- <pro-form :columns="autoData.columns" v-model="autoData.value"></pro-form> -->
    <Button @click="click">修改数据并刷新</Button>
    <pro-table
      @searchReset="searchReset"
      ref="table"
      :request="request"
      :map="map"
      :toolBar="toolBar"
      :columns="columns"
      :search="search"
      :submitForm="submitForm"
      :format="format"
      @on-row-click="tableAction"
      :form="form"
      :autoFetch="true"
      :hide="hide"
      :toolBarActions="toolBarActions"
      :pageSize="pageSize"
    >
    </pro-table>

    <!-- <pro-table :columns="columns" :searchLineNum="5"> </pro-table> -->
  </div>
</template>

<script>
/* eslint-disable*/
export default {
  name: "e",
  data() {
    return {
      pageSize: 30,
      hide: { table: false },
      toolBarActions: [
        "new",
        {
          key: "test",
          renderItem() {
            return (
              <Button
                type="primary"
                onclick={() => {
                  console.log("自定义按钮");
                }}
              >
                编辑
              </Button>
            );
          }
        },
        "refresh",
        "rowSetting"
      ],
      search: { searchLineNum: 3, value: { createUser3: "gg" } },
      form: {
        labelPosition: "right",
        formLineNum: 3,
        modalWidth: 70,
        value: { createUser10: "gg" }
      },
      data: [
        {
          cataLog: "33",
          createUser: "222"
        }
      ],
      cascader_data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫"
            },
            {
              value: "tiantan",
              label: "天坛"
            },
            {
              value: "wangfujing",
              label: "王府井"
            }
          ]
        }
      ],
      toolBar: true,
      autoData: {
        columns: [
          {
            title: "标题",
            key: "toolBar",
            type: "radio",
            props: {
              value: true
            }
          }
        ],
        value: {
          toolBar: false
        }
      },
      format: {
        // formatCurrent({ page }) {
        //   const { current, pageSize } = page;
        //   return { ...page, current: (current - 1) * pageSize };
        // }
        formatCurrent: "(page.current - 1) * page.pageSize"
      },
      columns: [
        {
          title: "cataLog",
          group: "B",
          key: "cataLog",
          disabled: true,
          renderSearch: {
            type: "Radio"
          },
          renderForm: {
            type: "DatePicker",
            props: {
              placeholder: "lastDate",
              format: "yyyy-MM-dd hh:mm:ss"
            },
            format(value) {
              return value ? dayjs(value).format("YYYY-MM-DD hh:mm:ss") : "";
            }
          },
          renderTable: () => {
            return (
              <Button
                onclick={() => {
                  console.log("aaa");
                }}
              >
                aaa
              </Button>
            );
          }
        },
        {
          title: "createUser",
          key: "createUser",
          renderSearch: ({ value, input }) => {
            return (
              <Select value={value} oninput={input} clearable>
                <Option value="1">1</Option>
              </Select>
            );
          }
        },
        {
          title: "form",
          key: "form",
          renderForm() {
            return (
              <Button
                onclick={() => {
                  const myData = "mu";
                  input(myData);
                }}
              >
                aaa
              </Button>
            );
          }
        },
        {
          title: "createUser2",
          disabled: true,
          renderSearch: {
            type: "Slider"
          },
          renderForm: {
            type: "DatePicker",
            style: {
              width: "100%"
            }
          },
          renderTable: (h, params) => {
            return (
              <span>{params.row.isAllow === "F" ? "黑名单" : "白名单"}</span>
            );
          },
          key: "createUser2"
        },
        {
          title: "createUser3",
          key: "createUser3",
          rules: [
            {
              required: true,
              message: "createUser3不能为空"
            }
          ],
          renderForm: ({ value, input }) => {
            console.log("value", value);
            const arr = _.isEmpty(value)
              ? []
              : _.isString(value)
              ? value.split(",")
              : value;
            console.log("arr", arr);
            return (
              <i-select
                clearable
                multiple
                value={arr}
                onInput={val => {
                  console.log("val", val);
                  input(val);
                  this.$refs.addForm.validateField("unitScene");
                }}
              >
                <i-option value="a">a</i-option>;
                <i-option value="b">b</i-option>;
              </i-select>
            );
          }
        },
        {
          title: "createUser8",
          renderSearch: {
            type: "InputNumber"
          },
          renderForm: {
            type: "i-switch"
          },
          key: "createUser8"
        },
        {
          title: "createUser4",
          renderForm: {
            type: "Select",
            children: []
          },
          renderSearch: ({ value, input }) => {
            return (
              <Cascader
                value={value || []}
                onInput={input}
                data={this.cascader_data}
                clearable
              ></Cascader>
            );
          },
          key: "createUser4"
        },
        {
          title: "creat4",
          rules: [
            {
              required: true,
              message: "creat4不能为空"
            }
          ],
          renderForm: {
            type: "Cascader",
            props: {
              value: [],
              data: [
                {
                  value: "beijing",
                  label: "北京",
                  children: [
                    {
                      value: "gugong",
                      label: "故宫"
                    },
                    {
                      value: "tiantan",
                      label: "天坛"
                    },
                    {
                      value: "wangfujing",
                      label: "王府井"
                    }
                  ]
                }
              ]
            }
          },
          key: "createUs3er4"
        },
        {
          title: "descript",
          tooltip: true,
          tooltipMaxWidth: 700,
          key: "descript",
          renderTable: {
            type: "span",
            useExp: true,
            text: "value===200?'成功':'失败';console.log(value);",
            style: {
              color: "value==200?'#19be6b':'#ed4014'"
            }
          },
          renderForm: {
            type: "i-input",
            props: {
              type: "textarea",
              rows: 4
            }
          },
          // renderForm() {
          //   return (
          //     <Input
          //       maxlength="100"
          //       show-word-limit
          //       type="textarea"
          //       placeholder="Enter something..."
          //       rows={4}
          //     />
          //   );
          // },
          formLineNum: 2
        },
        {
          title: "defValue",
          key: "defValue",
          renderTable: {
            type: "i-button",
            props: {
              type: "primary"
            }
          }
        },
        {
          title: "createUser10",
          renderSearch: {
            type: "input"
          },
          key: "createUser10"
        },
        {
          title: "操作",
          key: "action",
          actions: [
            {
              type: "edit",
              title: "编辑2",
              request: "/api/users/${cataLog}",
              method: "PUT"
            },
            {
              title: "新增",
              type: "new"
            },
            {
              title: "测试",
              action(params) {
                console.log("====================================");
                console.log(params);
                console.log("====================================");
              }
            },
            {
              title: "编辑",
              method: "POST",
              type: "edit",
              request: "http://192.168.0.38:3000/mock/106/api/test"
              // request(options) {
              //   console.log(options);
              //   return axios.post(
              //     "http://192.168.0.38:3000/mock/67/sys/sysOptionList",
              //     {
              //       a: options.row.cateLog
              //     }
              //   );
              // }
            },
            {
              type: "delete",
              title: "删除",
              request: "http://127.0.0.1:7068/api/v1/users/${id}",
              method: "DELETE"
            }
            // {
            //   title: "删除",
            //   type: "delete",
            //   // method: "delete",
            //   // request: "/id",
            //   keys: ["id"]
            // }
          ]
        }
      ],
      request: "http://192.168.0.38:3000/mock/106/api/table",
      // request(options) {
      //   // console.log(options);
      //   return axios.get("http://192.168.0.38:3000/mock/106/api/table", {
      //     headers: {
      //       nomsg: true
      //     },
      //     params: { ...options }
      //   });
      // },
      map: {
        dataPath: "data",
        totalPath: "totalRows",
        message: "message"
      },
      submitForm: "http://192.168.0.38:3000/mock/106/api/test"
    };
  },
  async mounted() {
    // const res = await this.$http.get(
    //   "http://192.168.0.38:3000/mock/106/api/table",
    //   {
    //     headers: {
    //       nomsg: true
    //     }
    //   }
    // );
    // console.log(this.columns[5]);
    // console.log("====================================");
    // this.columns[5].renderForm.children = [
    //   {
    //     type: "i-option",
    //     props: {
    //       value: "aa",
    //       label: "New York"
    //     }
    //   }
    // ];
    // this.$success(res);
  },
  methods: {
    searchReset(data) {},
    tableAction() {
      console.log("table click");
    },
    click() {
      this.$set(this.search.value, "createUser3", "123");
      this.$refs["table"].fetch();
      // this.toolBar = false;
      this.$set(this.data, 0, {
        createUser: "aa"
      });
    },
    table() {
      const ref = this.$refs.proSearch;
      console.log(ref.value);
    }
  }
};
</script>
// 自动路由相关的信息可以在这里填写
<route>
{
  "meta": {
    "title": "例子"
  }
}
</route>
