import { CLEAR, FETCH_ALL_STUDENTS, FETCH_ALL_SUBJECTS, FETCH_ALL_TEACHERS, MARK_ATTENDANCE, MARK_TEST, SHOW_ATTENDANCE, SHOW_MARKS, SHOW_STUDENT_ATTENDANCE, SHOW_STUDENT_SUBJECTS, SHOW_TEST_MARKS } from "../constants/actionTypes";

const reducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_TEACHERS:
            if (action.payload?.message)
                alert(action.payload.message);
            return action.payload;

        case FETCH_ALL_STUDENTS:
            if (action.payload?.message)
                alert(action.payload.message);
            return action.payload;

        case FETCH_ALL_SUBJECTS:
            if (action.payload?.message)
                alert(action.payload.message);
            return action.payload;

        case MARK_ATTENDANCE:
            if (action.payload?.message)
                alert(action.payload.message);
            return action.payload;

        case MARK_TEST:
            if (action.payload?.message)
                alert(action.payload.message);
            return action.payload;

        case SHOW_MARKS:
            if (action.payload?.message)
                alert(action.payload.message);
            return action.payload;

        case SHOW_ATTENDANCE:
            if (action.payload?.message)
                alert(action.payload.message);
            return action.payload;

        case SHOW_TEST_MARKS:
            if (action.payload?.message)
                alert(action.payload.message);
            return action.payload;

        case SHOW_STUDENT_SUBJECTS:
            if (action.payload?.message)
                alert(action.payload.message);
            return action.payload;

        case SHOW_STUDENT_ATTENDANCE:
            if (action.payload?.message)
                alert(action.payload.message);
            return action.payload;

        case CLEAR:
            return [];

        default:
            return state;
    }
}

export default reducer;