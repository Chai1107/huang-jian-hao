<template>
  <div class="container">
    <div class="card">
      <!-- 代办事项的输入框 -->
      <div class="you-need-todo">
        <Input
          v-model="value"
          class="input"
          size="large"
          placeholder="请输入你要做的事情"
          clearable
        />
        <!-- 确认按钮 -->
        <Button type="info" class="comfirm-btn" @click="comfirmBtn">
          <Icon class="confirm-btn-icon" type="ios-add" />
        </Button>
      </div>
      <!-- 代办事项列表 -->
      <div class="wait-todo-list-contain">
        <div class="wait-todo-list-contain-head">
          <p class="wait-todo-p">{{ listType }}</p>
          <i-switch
            v-model="switchh"
            size="large"
            true-color="#2db7f5"
            false-color="#2db7f5"
          >
            <span slot="open">待办</span>
            <span slot="close">已办</span>
          </i-switch>
        </div>
        <!-- 待办事项列表卡片 -->
        <div class="card-first">
          <div v-if="list.length === 0" class="card-first-no-data">
            没有事项
          </div>
          <div
            v-for="(item, index) of list"
            :key="index"
            class="wait-todo-items"
          >
            <div class="wait-todo-items-contain">
              <!-- 已完成按钮 -->
              <Icon
                v-if="switchh === true"
                class="already-btn"
                type="md-radio-button-off"
                @click="waitToDoClick(index, item)"
              />
              <Icon
                v-else
                class="already-btn"
                type="md-radio-button-on"
                @click="alreadyDoClick(index, item)"
              />
              <p v-if="switchh === true" class="wait-todo-items-contain-p">
                {{ item.waitTodoName }}
              </p>
              <p v-else class="wait-todo-items-contain-p">
                {{ item.alreadyDoName }}
              </p>
            </div>
            <!-- 删除事项按钮 -->
            <Icon
              v-if="switchh === true"
              class="delete-btn"
              type="ios-backspace"
              @click="deleteBtnWait(index)"
            />
            <Icon
              v-else
              class="delete-btn"
              type="ios-backspace"
              @click="deleteBtnAlready(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      switchh: true,
      value: '',
      waitTodoList: [],
      alreadyDoList: [],
    }
  },
  computed: {
    listType() {
      if (this.switchh === true) {
        return '待办事项'
      } else {
        return '已办事项'
      }
    },
    list() {
      if (this.switchh === true) {
        return this.waitTodoList
      } else {
        return this.alreadyDoList
      }
    },
  },
  methods: {
    // 确认按钮点击事件
    comfirmBtn() {
      if (this.value) {
        this.waitTodoList.push({ waitTodoName: this.value })
      } else {
        this.$Message.warning('请输入你要做的事情')
      }
      this.value = ''
      this.switchh = true
      this.$Message.success('添加成功')
    },
    // 代办事项列表删除按钮点击事件
    deleteBtnWait(index) {
      console.log(index)
      this.waitTodoList.splice(index, 1)
      this.$Message.success('已删除')
    },
    // 已办事项列表删除按钮点击事件
    deleteBtnAlready(indexAl) {
      this.alreadyDoList.splice(indexAl, 1)
      this.$Message.success('已删除')
    },
    // 代办事项完成按钮
    waitToDoClick(index, item) {
      console.log(item)
      this.waitTodoList.splice(index, 1)
      this.alreadyDoList.push({ alreadyDoName: item.waitTodoName })
      this.$Message.success('已完成')
      if (this.waitTodoList.length === 0) {
        this.switchh = false
      }
    },
    // 已办事项取消按钮
    alreadyDoClick(indexAl, itemAl) {
      console.log(itemAl)
      this.alreadyDoList.splice(indexAl, 1)
      this.waitTodoList.push({ waitTodoName: itemAl.alreadyDoName })
      this.$Message.error('未完成')
      if (this.alreadyDoList.length === 0) {
        this.switchh = true
      }
    },
  },
}
</script>

<style>
@import '../assets/main';
</style>
