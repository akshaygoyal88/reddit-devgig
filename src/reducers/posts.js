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

    default:
      return state;
  }
};