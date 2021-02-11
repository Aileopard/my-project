<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" id="tabs">
      <el-tab-pane label="资金计划控制开关" name="first">
      </el-tab-pane>
      <el-tab-pane label="资金计划控制参数设置" name="second" id="second">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-tree
          :props="props"
          :load="loadNode"
          :default-expand-all=true
          lazy
          show-checkbox
          @check-change="handleCheckChange"
          ref="treeNode">
        </el-tree>
        <el-button type="primary" id="submitButton" v-on:click="submit">提交</el-button>
        <el-button type="primary" id="backButton" v-on:click="back">返回</el-button>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">
<!--        <el-tree-->
<!--          :props="props"-->
<!--          :data="allDeptInfo"-->
<!--          :default-expand-all=true-->
<!--          @check-change="handleCheckChange"-->
<!--          ref="treeNode">-->
<!--        </el-tree>-->
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'fbsControlParam',
  data () {
    return {
      checkAll: false,
      activeName: 'second',
      props: {
        label: 'corpName',
        children: 'corpName',
        // 叶子节点不显示三角形
        isLeaf: (data, node) => {
          if (node.level === 2) {
            return true
          }
        }
      },
      allDeptInfo: {},
      checkedNode: [1]
    }
  },
  methods: {
    handleCheckChange (tab, event) {
      if (this.activeName === 'third') {
        var imCustNo = localStorage.getItem('imCustNo')
        this.$api.budget.budgetModel.getALLDeptInfo(imCustNo).then(res => {
          this.allDeptInfo = res.data.data
        })
      }
    },
    // 初始化以及每次点击节点，会执行
    loadNode (node, resolve) {
      if (node.level === 0) {
        // 初始化，加载单位
        var imCustNo = localStorage.getItem('imCustNo')
        this.$api.budget.budgetModel.getALLDeptInfo(imCustNo).then(res => {
          this.allDeptInfo = res.data.data
          resolve(this.allDeptInfo.corpList)
        })
      } else if (node.level === 1) {
        // 加载部门信息
        resolve(this.allDeptInfo.deptMap[node.data.corpCode])
      } else {
        resolve([])
      }
    },
    handleClick () {
    },
    back () {
      this.$router.push('/')
    },
    submit () {
      // 获取所有被选中的
      var checkedKeys = this.$refs.treeNode.getCheckedNodes()
      // checkedKeys[checkedKeys.length] = {imCustNo: localStorage.getItem('imCustNo')}
      console.log(checkedKeys)
      console.log(JSON.stringify(checkedKeys))
      var a = {
        imCustNo: localStorage.getItem('imCustNo'),
        corpList: checkedKeys
      }
      console.log(a)
      this.$api.budget.budgetModel.saveBudgetDeptInfo(a)
    },
    handleCheckAllChange (val) {
      if (this.checkAll) {
        this.checkedNode = []
      } else {
        this.$refs.treeNode.setCheckedKeys([])
      }
    }
  }
}
</script>

<style scoped>
. is-leaf.el-tree-node_expand-icon  {

  display: none
}
#tabs {
  margin-left: 10px;
}
#second{
  margin-left: 50px;
}
#submitButton{
  margin-left: 100px;
  /*margin: auto;*/
}
#backButton{
  margin-left: 10px;
}
</style>
