<template>
    <div class="container">
        <div class="row mt-4">
            <div class="col-md-12 mx-auto">
                <table class="table table-success table-striped">
                    <thead>
                        <tr>
                            <th class="text-center" scope="col">Ref</th>
                            <th class="text-center" scope="col">Title</th>
                            <th class="text-center" scope="col">Description</th>
                            <th class="text-center" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="(book, index) in books" :key="index">
                            <th scope="row">{{ book.ref }}</th>
                            <td>{{ book.title }}</td>
                            <td>{{ book.description }}</td>
                            <!-- <td class="d-flex justify-content-center  align-items-center"> -->
                            <td>
                                <router-link 
                                    :to="{name: 'UpdateBook', params: {id: book.ref}}"
                                    class="btn btn-warning mx-2 "
                                >
                                    <i class="fas fa-edit"></i>
                                </router-link>
                                <span class="btn btn-danger" @click="removeBook(book)">
                                    <i class="fas fa-trash"></i>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex'    

export default {
    name: "Home",
    setup() {
        const store = useStore()
        const books = computed(() => store.state.books.books)

        function getBooks() {
            store.dispatch("books/getBooks")
        }

        function removeBook(book){
            store.commit("books/removeBook", book)
        }

        onMounted(() => {
            getBooks();
        })
        return {
            books,
            removeBook
        }
    }
}
</script>