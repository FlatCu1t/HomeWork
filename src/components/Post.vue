<script setup>
const props = defineProps({
    post: Object
});
</script>

<template>
    <div class="post">
        <p class="postTitle">{{ post.title }}</p>
        <p class="postBody">{{ post.body }}</p>
    </div>
</template>

<style scoped>
.post {
    width: 400px;
    min-height: 150px;
    background-color: rgba(255,255,255,0.5);
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.4);
    border-radius: 7px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.postTitle {
    font-size: 20px;
    font-weight: 600;
}
.postBody {
    font-size: 16px;
}
</style>