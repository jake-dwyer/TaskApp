<template>
<div v-if="isVisible" class="modal" @click="closeModal">
    <div class="modalContent" @click.stop>
        <form @submit.prevent="submitTask">
            <h1>Create a new task</h1>
            <input v-model="task" placeholder="* Enter task name" class="form-control" required>
            <textarea v-model="description" placeholder="Describe your task" class="form-control"></textarea>
            <input type="date" v-model="taskDueDate" class="calendar">
            <button type="submit">Create Task</button>
        </form>
    </div>
</div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closeModal() {
            console.log('closeModal called');
            this.$emit('update:isVisible', false);
        },
        submitTask() {
            this.closeModal();
        }
    }
};
</script>

<style scoped>
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
}

.modalContent {
    background-color: var(--color-background);
    margin: 15% auto;
    padding: 40px;
    width: 80%;
    border: none;
    border-radius: 8px;
}

h1 {
    color: var(--text-primary);
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
    border: 1px solid var(--divider-gray);
    transition: .5s;
    background-color: none;
    color: var(--text-secondary);
}

textarea {
    min-height: 160px;
    max-height: 300px;
    margin-top: 16px;
    border-radius: 4px;
    font-size: 16px;
    padding: 8px;
    border: 1px solid var(--divider-gray);
    transition: .5s;
    background-color: none;
    color: var(--text-secondary);
}

input[type="date"] {
    border-radius: 4px;
    font-size: 16px;
    padding: 8px;
    border: 1px solid var(--divider-gray);
    transition: .5s;
    background-color: none;
}

input:focus, textarea:focus, input[type="date"]:focus {
    border-color: var(--text-CTA);
    box-shadow: none;
}

button {
    background-color: var(--text-CTA);
    margin-left: 16px;
    padding: 8px 20px 8px 20px;
    border-radius: 4px;
    font-size: 16px; 
    font-weight: 600;
    color: #fff;
    border: 1px solid var(--text-CTA);
}

</style>