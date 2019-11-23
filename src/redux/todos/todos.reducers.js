import TODO_ACTION_CONSTANTS from './todos.constants';

const INITIAL_STATE = {
    'todos': [],
    'error': null,
    'isLoading': true,
    'bucketName': ''
};

const todosReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TODO_ACTION_CONSTANTS.FETCH_TODOS_START:
            return {
                ...state,
                isLoading: false,
                error: null,
                todos: [],
                bucketName: ''
            };
        case TODO_ACTION_CONSTANTS.MODIFY_TODO_SUCCESS:
            console.log(state);
            const test = {
                ...state,
                isLoading: false,
                error: null,
                todos: updateSpecificTodo(state.todos, action.payload)
            };
            console.log(test);
            return test;
        case TODO_ACTION_CONSTANTS.DELETE_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                todos: state.todos.filter((todo) => todo.todoId !== action.payload)
            };
        case TODO_ACTION_CONSTANTS.FETCH_TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                todos: action.payload.todos,
                bucketName: action.payload.bucketName
            };
        case TODO_ACTION_CONSTANTS.MODIFY_TODO_FAILURE:
        case TODO_ACTION_CONSTANTS.ADD_TODO_FAILURE:
        case TODO_ACTION_CONSTANTS.DELETE_TODO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case TODO_ACTION_CONSTANTS.FETCH_TODOS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default todosReducer;

const updateSpecificTodo = (todos, specificTodo) => {
    const existing = todos.find((todo) => (todo.todoId === specificTodo.todoId));
    if (existing) {
        return todos.map(todo => (todo.todoId === specificTodo.todoId ? {...specificTodo} : todo));
    } else {
        return [{...specificTodo}, ...todos];
    }
};