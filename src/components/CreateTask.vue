<template>
<div v-if="isVisible" class="modal" @click="closeModal">
    <div class="modalContent" @click.stop>
        <form @submit.prevent="submitTask">
            <h1>Create a new task</h1>
            <input v-model="taskName" placeholder="* Enter task name" class="form-control" required>
            <textarea v-model="taskDescription" placeholder="Describe your task" class="form-control"></textarea>
            <div class="foot">
                <input type="date" v-model="taskDueDate" class="calendar">
                <button type="submit">Create Task</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import DateMixin from '../mixins/dateMixin.js';

export default {
    mixins: [DateMixin],

    data() {
        return {
        taskName: '',
        taskDescription: '',
        taskDueDate: '',
        tasks: []
        }
    },

    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        taskCount: {
            type: Number,
            default: 0,
            required: true
        }
    },

    methods: {
        closeModal() {
            this.$emit('update:isVisible', false);
        },
        submitTask() {
            const newId = this.taskCount + 1;
            const task = {
                id: newId,
                name: this.taskName.trim(),
                description: this.taskDescription.trim(),
                dueDate: this.taskDueDate,
                status: '⦁︎ Idle'
            };

            this.$emit('task-created', task, newId);
            this.taskName = '';
            this.taskDescription = '';
            this.taskDueDate = '';
            this.closeModal();
        }
    },

    computed: {
    formattedDueDate() {
        return this.taskDueDate ? this.formatDate(this.taskDueDate) : '';
        }
    },
};
</script>

<style scoped>
@import '../assets/base.css';

.modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
    align-items: center;
    justify-content: center;
}

.modalContent {
    background-color: var(--color-background);
    padding: 40px;
    width: 500px; 
    max-width: 90%;
    min-width: 300px;
    height: auto;
    border: var(--color-grid-lines);
    border-radius: 8px;
}

h1 {
    color: var(--color-text-primary);
    font-size: 32px;
    font-weight: 600;
    margin-top: 6px;
}

input {
    margin-top: 16px;
    margin-bottom: 16px;
    border-radius: 4px;
    font-size: 16px;
    padding: 8px;
    border: 1px solid var(--color-grid-lines);
    transition: .5s;
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-weight: 500;
}

input::placeholder {
    color: var(--color-text-primary);
    font-weight: 500;
}

textarea {
    height: 360px;
    margin-top: 16px;
    border-radius: 4px;
    font-size: 16px;
    padding: 8px;
    border: 1px solid var(--color-grid-lines);
    transition: .5s;
    background-color: var(--color-background);
    color: var(--color-text-primary);
    resize: none;
    font-weight: 500;
}

textarea::placeholder {
    color: var(--color-text-primary);
    font-weight: 500;
}

input[type="date"] {
    min-width: 100px;
    background: transparent;
    border: 1px solid var(--color-grid-lines);
    border-radius: 4px;
    padding: 12px;
    font-size: 16px;
    color: var(--color-text-primary);
}

input[type="date"]::placeholder {
    color: var(--color-text-primary);
    font-weight: 500;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    color: var(--color-text-primary);
}

input:focus, textarea:focus, input[type="date"]:focus {
    border-color: var(--color-text-CTA);
    box-shadow: none;
    background-color: var(--color-background);
    color: var(--color-text-primary);
}

button {
    background-color: var(--color-text-CTA);
    margin-left: 16px;
    padding: 8px 20px 8px 20px;
    border-radius: 4px;
    font-size: 16px; 
    font-weight: 600;
    color: #fff;
    border: 1px solid var(--color-text-CTA);
}

.foot {
    margin-top: 8px;
}

@media (max-width: 776px) {
    .modalContent {
        margin: 10% auto;
        padding: 20px;
        width: 90%; 
    }

    h1 {
        font-size: 24px;
    }

    input, textarea, input[type="date"] {
        font-size: 14px;
        padding: 12px;
    }

    button {
        font-size: 14px; 
        padding: 12px 16px;
        font-weight: 500;
    }
}
</style>