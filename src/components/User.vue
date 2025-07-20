<script setup>
    const props = defineProps({
        user: Object
    })
</script>

<template>
    <div>
        <p class="userName">{{ user.name }}</p>
        <p class="userEmail">{{ user.email }}</p>
        <p class="userCompany">{{ user.company.name }}</p>
    </div>
</template>

<style scoped>
.userName {
    font-size: 20px;
    font-weight: 600;
    text-wrap: nowrap;
}

.userEmail {
    font-size: 18px;
    font-weight: 400;
}

.userCompany {
    font-size: 16px;
    font-weight: 400;
}
</style>