<template>
    <div id="app">
        <button @click="messageHint" class="btn btn-primary">消息提示</button>
        <hr/>
        <button @click="noticeHint" class="btn btn-primary">通知提示</button>
    </div>
</template>

<script>
export default {
    methods: {
        messageHint() {
            this.$message.config({top: `100px`,
                duration: 2,
                maxCount: 3,
            })
            console.log(this.$message)
            this.$message.loading("This is a normal message");
        },
        noticeHint() {
            this.$notification.success({
                message: "Notification Title",
                description:
                    "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },
    },
};
</script>

<style lang="less">
.btn{
    line-height: 1.499;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    box-shadow: 0 2px 0 rgba(0,0,0,.015);
    cursor: pointer;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    color: rgba(0,0,0,.65);
    background-color: #fff;
    border: 1px solid #d9d9d9;
        margin-right: 8px;
    margin-bottom: 12px;
}
.btn-primary{
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 0 rgba(0,0,0,.045);
}
</style>
