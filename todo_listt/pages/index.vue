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
        <P class="wait-todo-p"> 待办事项 </P>
        <!-- 待办事项列表卡片 -->
        <div class="card-first">
          <div v-if="waitTodoList.length === 0" class="card-first-no-data">
            没有事项
          </div>
          <div
            v-for="(item, index) of waitTodoList"
            :key="index"
            class="wait-todo-items"
          >
            <div class="wait-todo-items-contain">
              <!-- 已完成按钮 -->
              <Icon
                class="already-btn"
                type="md-radio-button-off"
                @click="waitToDoClick(index, item)"
              />
              <p class="wait-todo-items-contain-p">
                {{ item.waitTodoName }}
              </p>
            </div>
            <!-- 删除事项按钮 -->
            <Icon
              class="delete-btn"
              type="ios-backspace"
              @click="deleteBtnWait(index)"
            />
          </div>
        </div>
      </div>
      <!-- 已办事项列表 -->
      <div class="already-do-list">
        <P class="already-do-list-p">已办事项</P>
        <!-- 待办事项列表卡片 -->
        <div class="card-second">
          <div v-if="alreadyDoList.length === 0" class="card-first-no-data">
            没有事项
          </div>
          <div
            v-for="(item2, index2) of alreadyDoList"
            :key="index2"
            class="already-do-items"
          >
            <div class="already-do-items-contain">
              <Icon
                class="already-btn"
                type="md-radio-button-on"
                @click="alreadyDoClick(index2, item2)"
              />
              <p class="already-do-items-contain-p">
                {{ item2.alreadyDoName }}
              </p>
            </div>
            <!-- 删除事项按钮 -->
            <Icon
              class="delete-btn"
              type="ios-backspace"
              @click="deleteBtnAlready(index2)"
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
      value: '',
      waitTodoList: [],
      alreadyDoList: [],
    }
  },
  methods: {
    // 确认按钮点击事件
    comfirmBtn() {
      const obj = {
        waitTodoName: this.value,
      }
      if (this.value) {
        this.waitTodoList.push(obj)
      } else {
        this.$Message.warning('请输入你要做的事情')
      }
      this.value = ''
    },
    // 代办事项列表删除按钮点击事件
    deleteBtnWait(index) {
      console.log(index)
      this.waitTodoList.splice(index, 1)
    },
    // 已办事项列表删除按钮点击事件
    deleteBtnAlready(index2) {
      this.alreadyDoList.splice(index2, 1)
    },
    // 代办事项完成按钮
    waitToDoClick(index, item) {
      this.waitTodoList.splice(index, 1)
      const obj = {
        alreadyDoName: item.waitTodoName,
      }
      this.alreadyDoList.push(obj)
    },
    // 已办事项取消按钮
    alreadyDoClick(index2, item2) {
      this.alreadyDoList.splice(index2, 1)
      const obj2 = {
        waitTodoName: item2.alreadyDoName,
      }
      this.waitTodoList.push(obj2)
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../static/bg.jpg');
  background-size: cover;
}
.card {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  height: 610px;
}
.you-need-todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input {
  margin-right: 8px;
}
.ivu-btn-info {
  height: 36px;
}
.confirm-btn-icon {
  font-size: 22px;
  font-weight: 700;
}
.wait-todo-list-contain {
  border-top: 2px dashed #999;
  margin-top: 16px;
  padding-top: 8px;
}
.wait-todo-p {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}
.wait-todo-items,
.already-do-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 4px;
}
.wait-todo-items:hover,
.already-do-items:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.wait-todo-items-contain,
.already-do-items-contain {
  display: flex;
  align-items: center;
}
.ivu-checkbox-inner {
  width: 22px;
  height: 22px;
}
.delete-btn {
  font-size: 20px;
  color: rgb(253, 81, 81);
}
.delete-btn:hover {
  cursor: pointer;
  color: rgb(255, 131, 131);
}
.already-btn {
  font-size: 20px;
  color: #2db7f5;
  margin-right: 4px;
}
.already-btn:hover {
  cursor: pointer;
  color: #88d9ff;
}
.wait-todo-items-contain-p,
.already-do-items-contain-p {
  margin-left: 4px;
  font-size: 12px;
}
.already-do-list {
  border-top: 2px dashed #999;
  margin-top: 16px;
  padding-top: 8px;
}
.already-do-list-p {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}
.card-first-no-data {
  color: #727272;
  font-size: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  line-height: 180px;
}
.card-first,
.card-second {
  height: 200px;
  overflow: auto;
  padding-right: 4px;
}
.card-first::-webkit-scrollbar,
.card-second::-webkit-scrollbar {
  width: 4px;
  position: relative;
}
.card-first::-webkit-scrollbar-thumb,
.card-second::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: #88d9ff;
}
.card-first::-webkit-scrollbar-track,
.card-second::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(255, 255, 255, 0);
}
.ivu-input {
  border: none;
}
</style>
