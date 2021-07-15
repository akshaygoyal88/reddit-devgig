const defaultPosts = { loading: false, data: [], selected: {} };

export default (state = defaultPosts, action) => {
  console.log(action, 'action');
  switch (action.type) {
    case 'FETCH_BLOGS_PENDING': {
      return { ...state, loading: true };
    }

    case 'FETCH_BLOGS_FULFILLED': {
      const { data } = action.payload.data;
      return {
        ...state,
        loading: false,
        data: [...state.data, ...data.children],
      };
    }

    case 'SELECTED_BLOG': {
      const { post } = action.payload;
      return {
        ...state,
        selected: state.selected.id === post.id ? {} : post,
      };
    }
    case 'DISMISS_POST': {
      return {
        ...state,
        data: state.data.filter(post => post.data.id !== action.payload.id),
      };
    }

    case 'DISMISS_ALL': {
      return { ...state, ...defaultPosts };
    }
    default:
      return state;
  }
};