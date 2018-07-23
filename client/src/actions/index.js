import axios from 'axios';
import { FETCH_USER } from './types';
import { UPLOAD_IMAGE } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data});
};


const readUploadedFileAsDataURL = inputFile => {
  const temporaryFileReader = new FileReader();
  var img = new Image();
  return new Promise((resolve, reject) => {

    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      img.src = temporaryFileReader.result;
      resolve(img);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};

export const uploadFile = event => async dispatch => {
  event.persist();

  if (!event.target || !event.target.files) {
    return null;
  }

  const fileList = event.target.files;

  // Uploads will push to the file input's `.files` array. Get the last uploaded file.
  const latestUploadedFile = fileList.item(fileList.length - 1);

  try {
    const fileContents = await readUploadedFileAsDataURL(latestUploadedFile);
    dispatch({ type: UPLOAD_IMAGE, payload: fileContents });
  } catch (e) {
    console.log(e);
    return dispatch({ type: UPLOAD_IMAGE, payload: null });;
  }
};
