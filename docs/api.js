const BASE_URL =
  "https://thinkful-list-api.herokuapp.com/jordan-tellez/bookmarks";
// check fetch for error and return the errors
function listApiFetch(...args) {
  let error;
  return fetch(...args)
    .then((res) => {
      if (!res.ok) {
        // Create an error!
        error = {
          code: res.status,
        };
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      

      // In either case, parse the JSON stream:
      return res.json();
    })
    .then((data) => {
      // If error was flagged, reject the Promise with the error object
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      // Otherwise give back the data as resolved Promise
      return data;
    });
};

const getBookmarks = function () {
  return fetch(`${BASE_URL}`);
};

const createBookmark = function (obj) {
  const newBookmark = obj;
  console.log("newBookmark:", newBookmark);
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: newBookmark,
  };

  return listApiFetch(`${BASE_URL}`,options);
};

const deleteBookmark = function (objId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  };
  return listApiFetch(`${BASE_URL}/${objId}`,options);
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
};
