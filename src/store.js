const { createStore } = require("vuex");

const books = {
    namespaced: true,
    state(){
        return {
            books: [],
            book: null
        };
    },

    mutations: {
        fetchBooks(state){
            let books = JSON.parse(localStorage.getItem("books")) || []
            state.books = books
        },
        removeBook(state, book){
            const currentBooks = state.books;
            const updateBooks = currentBooks.filter((item) => item !== book);
            localStorage.setItem("books", JSON.stringify(updateBooks));
            state.books = updateBooks
        },
        addBook(state, book){
            let books = state.books
            books.push(book)
            localStorage.setItem("books", JSON.stringify(books));
        },
        fetchBook(state, ref){
            const books =JSON.parse(localStorage.getItem("books"))
            const book = books.find((item) => item.ref === ref);
            state.book = book;
        },
        updateBook(state, book){
            let books = state.books
            let updateBooks = books.filter((item) => item.ref !== state.book.ref)
            updateBooks.push(book)
            localStorage.setItem("books", JSON.stringify(updateBooks));
        }
    },

    actions: {
        getBooks({commit}){
            commit("fetchBooks")
        },
        getBook({commit}, ref){
            console.log('my ', ref)
            commit("fetchBook", ref)
        },
    }
}

export const store = createStore({
    modules: { books }
})