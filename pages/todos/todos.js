// pages/todos/todos.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        search: "",
        todos: [{
                name: 'Learning MYAPP',
                completed: true
            },
            {
                name: 'Learning JAVA',
                completed: false
            },
            {
                name: 'Learning PYTHON',
                completed: false
            }
        ],
        left_time: 2,
        all_completed: false
    },
    plus_click: function () {
        if (!this.data.search) {
            wx.showToast({
                title: "输入不可为空",
                icon: "none"
            })
            return
        }

        this.data.todos.push({
            name: this.data.search,
            completed: false
        })
        this.setData({
            todos: this.data.todos,
            search: "",
        })
        this.reset_leftitem_time()
    },
    input_change: function (e) {
        this.setData({
            search: e.detail.value
        })
    },
    status_change_click: function (e) {
        var index = e.currentTarget.dataset.index
        this.data.todos[index].completed = !this.data.todos[index].completed
        this.setData({
            todos: this.data.todos,
        })
        this.reset_leftitem_time()
    },

    remove_click: function (e) {
        var index = e.currentTarget.dataset.index
        this.data.todos.splice(index, 1)
        this.setData({
            todos: this.data.todos
        })
        this.reset_leftitem_time()
    },



    all_completed_click: function () {
        this.data.all_completed = !this.data.all_completed
        var todos = this.data.todos
        var _this = this
        todos.forEach(function (item) {
            item.completed = _this.data.all_completed
        })
        this.setData({
            todos: todos
        })
        this.reset_leftitem_time()
    },
    clear_click: function () {
        var todos = this.data.todos.filter(function (item) {
            return !item.completed
        })
        // this.data.todos.forEach(function(item){
        //     if(!item.completed){
        //         todos.push(item)
        //     }
        // })
        this.setData({
            todos: todos
        })
        this.reset_leftitem_time()
    },
    reset_leftitem_time: function () {
        var left_time = 0
        var index
        for (index in this.data.todos) {
            if (!this.data.todos[index].completed) {
                left_time = left_time + 1
            }
        }
        this.setData({
            left_time: left_time
        })
    },
    onLoad: function () {

    },
    storage: function () {
        wx.setStorage({
            key: "1233",
            data: "1234123",
            success: function (e) {
                console.log(e)
            }
        })
    },
    getstorage: function () {

        wx.getStorage({
            key: 'key',
            success: function (data) {
                console.log(data.data)
            }
        })
    },
    onHide: function () {
        var data = this.data
        wx.setStorage({
            data: data,
            key: 'key',
            success: function () {
                console.log("storege success")
            }
        })
    },
    onShow: function () {
        var length = wx.getStorageInfo({
            success: (option) => {
                console.log(option.keys.length)
            },
        })
        if (length != 0) {
            var storage_data;
            wx.getStorage({
                key: 'key',
                success: function (data) {
                    storage_data = data
                    console.log("use")
                }
            });
            this.setData({
                data: storage_data
            })
        }
    },
    onUnload: function () {
        console.log("stop")
    }
})