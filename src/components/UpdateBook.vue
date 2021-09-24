<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mx-auto my-4">
                <h3 class="border-bottom py-2">Modifier book</h3>
                <form @submit="submit" class="mt-3">
                    <div class="form-group mb-3">
                        <input 
                            type="text"
                            disabled
                            v-model="state.book.ref"
                            :class="state.book.ref.length ? state.validClass : state.errorClass"
                            placeholder="Ref"
                        >
                    </div>
                    <div class="form-group mb-3">
                        <input 
                            type="text"
                            v-model="state.book.title"
                            :class="state.book.title.length ? state.validClass : state.errorClass"
                            placeholder="Title"
                        >
                    </div>
                    <div class="form-group mb-3">
                        <textarea 
                            :class="state.book.description.length ? state.validClass : state.errorClass" 
                            cols="30" 
                            rows="10"
                            placeholder="Description"
                            v-model="state.book.description"
                        >
                        </textarea>
                    </div>
                    <div class="form-group mb-3">
                        <button :disabled="!state.book.ref || !state.book.title || !state.book.description " type="submit" class="btn btn-success">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name: "UpdateBook",
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()

        const state = reactive({
            book: {
                ref: "",
                title: "",
                description: "",
            },
            errorClass: "form-control is-invalid",
            validClass: "form-control is-valid",
        });

        function submit($event) {
            $event.preventDefault();
            store.commit("books/updateBook", state.book)
            
            state.book = {
                ref: "",
                title: "",
                description: "",
            }

            router.push("/")
        }

        onMounted(() => {
            const ref = route.params.id;
            console.log('store ', ref)
            store.dispatch("books/getBook", ref)
            state.book = store.state.books.book
        });

        return {
            state,
            submit
        }
    }
}
</script>