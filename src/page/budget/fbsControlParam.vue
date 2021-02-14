<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" id="tabs">
      <el-tab-pane label="资金计划控制开关" name="first">
        <div>
          <div>编制方式</div>
          <el-radio v-model="fbsComFlag" label="0">按单位</el-radio>
          <el-radio v-model="fbsComFlag" label="1">按部门</el-radio>
          <el-radio v-model="fbsComFlag" label="2">按科室</el-radio>
        </div>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-tab-pane>
      <el-tab-pane label="资金计划控制参数设置" name="second" id="second">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-tree
          :data="allDeptInfo"
          :props="props"
          default-expand-all
          :default-checked-keys="checkedNode"
          show-checkbox
          node-key="displayNode"
          ref="allDeptInfo">
        </el-tree>
        <el-button type="primary" id="submitButton" v-on:click="submit">提交</el-button>
        <el-button type="primary" id="backButton" v-on:click="back">返回</el-button>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">
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
      activeName: 'first',
      props: {
        label: 'displayNode',
        children: 'deptList'
      },
      allDeptInfo: {},
      fbsComFlag: '1',
      checkedNode: []
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
    handleClick () {
    },
    back () {
      this.$router.push('/')
    },
    submit () {
      // 获取所有被选中的
      var checkedNodes = this.$refs.allDeptInfo.getCheckedNodes()
      console.log(checkedNodes)
      // 获取所有半选中的
      var halfCheckedNodes = this.$refs.allDeptInfo.getHalfCheckedNodes()
      console.log(halfCheckedNodes)
      var corpList = []
      var deptList = []
      // 处理被选中的节点，筛选出单位和部门
      for (var i = 0; i < checkedNodes.length; i++) {
        var curNode = checkedNodes[i]
        if (!('deptCode' in curNode)) {
          corpList.push(curNode)
        } else {
          deptList.push(curNode)
        }
      }

      // 处理半选中的节点，筛选出单位和部门
      for (var j = 0; j < halfCheckedNodes.length; j++) {
        var curHalfNode = halfCheckedNodes[j]
        console.log('aaa')
        console.log(curHalfNode)
        if (!('deptCode' in curHalfNode)) {
          console.log('嘻嘻嘻')
          corpList.push(curHalfNode)
        } else {
          deptList.push(curHalfNode)
        }
      }

      var a = {
        imCustNo: localStorage.getItem('imCustNo'),
        corpList: corpList,
        deptList: deptList
      }
      this.$api.budget.budgetModel.saveBudgetDeptInfo(a)
    },
    handleCheckAllChange (val) {
      if (this.checkAll) {
        this.$refs.allDeptInfo.setCheckedNodes(this.allDeptInfo)
      } else {
        this.$refs.allDeptInfo.setCheckedKeys([])
      }
    },
    onSubmit () {
      let fbsBudgetControlList = {
        imCustNo: localStorage.getItem('imCustNo'),
        fbsBudgetControlList: [{controlValue: this.fbsComFlag,
          controlName: 'FBS_COMPILE_FLAG',
          imCustNo: localStorage.getItem('imCustNo')}]}
      console.log(fbsBudgetControlList)
      this.$api.budget.budgetModel.saveBudgetControlParam(fbsBudgetControlList)
    }
  },
  created () {
    // 初始化，加载单位
    var imCustNo = localStorage.getItem('imCustNo')
    this.$api.budget.budgetModel.getALLDeptInfo(imCustNo).then(res => {
      this.allDeptInfo = res.data.data.corpList
      this.checkedNode = res.data.data.checkNode
    })
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
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
