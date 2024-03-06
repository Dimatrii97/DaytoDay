<template>
    <div class="title">Перенеси все задачи из "Нужно сделать"</div>
    <div class="game">
        <div
            class="column todo"
            @dragover.prevent
            @drop="onDrop('todo')"
        >
            <div class="stage">Нужно сделать</div>
            <div
                class="task"
                v-for="task in tasks"
                :key="task.id"
                draggable="true"
                @dragstart="onDragStart(task.id)"
            >
                {{ task.name }}
            </div>
        </div>
        <div
            class="column inProgress"
            @dragover.prevent
            @drop="onDrop('inProgress')"
        >
            <div class="stage">В работе</div>
            <div
                class="task"
                v-for="task in inProgressTasks"
                :key="task.id"
                draggable="true"
                @dragstart="onDragStart(task.id)"
            >
                {{ task.name }}
            </div>
        </div>
        <div
            class="column done"
            @dragover.prevent
            @drop="onDrop('done')"
        >
            <div class="stage">Демонстрация</div>
            <div
                class="task"
                v-for="task in doneTasks"
                :key="task.id"
                draggable="true"
                @dragstart="onDragStart(task.id)"
            >
                {{ task.name }}
            </div>
        </div>
        <div
            v-if="isToDoEmpty"
            class="congratulations"
        >
            <h1>Поздравляем! Все задачи выполнены!</h1>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tasks: [
                { id: 1, name: 'Редизайн сделки' },
                { id: 2, name: 'Переезд на Pangolin' },
                { id: 3, name: 'ОЧЕНЬ БОЛЬШАЯ ЗАДАЧА' },
            ],
            inProgressTasks: [],
            doneTasks: [],
            draggedTaskId: null,
        };
    },
    emits: ['game-completed'],
    computed: {
        isToDoEmpty() {
            return this.tasks.length === 0;
        },
    },
    methods: {
        onDragStart(taskId) {
            this.draggedTaskId = taskId;
        },
        onDragEnter(event) {
            event.preventDefault();
        },
        onDrop(column) {
            const taskToMove = this.tasks.find(task => task.id === this.draggedTaskId);
            if (!taskToMove) return;

            if (column === 'todo') {
                this.tasks = this.tasks.filter(task => task.id !== this.draggedTaskId);
                this.tasks.push(taskToMove);
            } else if (column === 'inProgress') {
                this.tasks = this.tasks.filter(task => task.id !== this.draggedTaskId);
                this.inProgressTasks.push(taskToMove);
            } else if (column === 'done') {
                this.tasks = this.tasks.filter(task => task.id !== this.draggedTaskId);
                this.doneTasks.push(taskToMove);
            }
        },
    },
    watch: {
        isToDoEmpty() {
            this.$emit('game-completed');
        },
    },
};
</script>

<style>
.title {
    padding-top: 40px;
    display: flex;
    justify-content: center;
    font: inherit;
    font-size: 24px;
}

.game {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
}

.column {
    width: 30%;
    border-radius: 5px;
    background-color: #f4f5f7;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.stage {
    padding: 10px;
    background-color: #4e6ef2;
    color: white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 0;
}

.task {
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    margin: 10px;
    cursor: pointer;
    border: 1px solid #dfe1e6;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.todo {
    border-left: 6px solid #0052cc;
}

.inProgress {
    border-left: 6px solid #ffab00;
}

.done {
    border-left: 6px solid #61bd4f;
}

.congratulations {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #61bd4f;
    color: white;
    padding: 20px;
    border-radius: 5px;
    font: inherit;
    font-size: 24px;
}
</style>
