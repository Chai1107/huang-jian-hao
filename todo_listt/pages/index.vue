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
          <RadioGroup v-model="stateBtn" type="button">
            <Radio :label="0">全部</Radio>
            <Radio :label="1">待办</Radio>
            <Radio :label="2">已办</Radio>
          </RadioGroup>
        </div>
        <!-- 待办事项列表卡片 -->
        <div class="card-first">
          <div v-if="todoList.length === 0" class="card-first-no-data">
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
                v-if="item.state === 1"
                class="already-btn"
                type="md-radio-button-off"
                @click="waitToDoClick(index, item)"
              />
              <Icon
                v-else
                class="already-btn"
                type="md-radio-button-on"
                @click="waitToDoClick(index, item)"
              />
              <p class="wait-todo-items-contain-p">
                {{ item.name }}
              </p>
            </div>
            <!-- 删除事项按钮 -->
            <Icon
              v-if="stateBtn === 0"
              class="delete-btn"
              type="ios-backspace"
              @click="deleteBtnWait(index)"
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
      stateBtn: 0,
      value: '',
      todoList: [
        {
          name: '吃饭',
          state: 1,
        },
        {
          name: '刷牙',
          state: 1,
        },
        {
          name: '洗澡',
          state: 1,
        },
        {
          name: '看电影',
          state: 2,
        },
      ],
    }
  },
  computed: {
    listType() {
      if (this.stateBtn === 0) {
        return '全部事项'
      } else if (this.stateBtn === 1) {
        return '待办事项'
      } else {
        return '已办事项'
      }
    },
    list() {
      if (this.stateBtn === 0) {
        return this.todoList
      } else {
        return this.todoList.filter((obj) => obj.state === this.stateBtn)
      }
    },
  },
  methods: {
    // 确认按钮点击事件
    comfirmBtn() {
      if (this.value) {
        this.todoList.push({ name: this.value, state: 1 })
      } else {
        this.$Message.warning('请输入你要做的事情')
      }
      this.value = ''
      this.stateBtn = 1
      this.$Message.success('添加成功')
    },
    // 代办事项列表删除按钮点击事件
    deleteBtnWait(index) {
      console.log(index)
      this.todoList.splice(index, 1)
      this.$Message.success('已删除')
    },
    // 代办事项完成按钮
    waitToDoClick(index, item) {
      console.log(item)
      if (item.state === 2) {
        item.state = 1
        this.$Message.error('未完成')
      } else {
        item.state = 2
        this.$Message.success('已完成')
      }
    },
  },
}
</script>

<style>
@import '../assets/main';
</style>
