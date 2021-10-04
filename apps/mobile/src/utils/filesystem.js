import Sodium from 'react-native-sodium';
import RNFetchBlob from 'rn-fetch-blob';
import {useAttachmentStore} from '../provider/stores';

const cacheDir = RNFetchBlob.fs.dirs.CacheDir;

let placeholder = `data:image/jpeg;base64,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`;

async function readEncrypted(filename, key, cipherData) {
  try {
    let path = `${cacheDir}/${filename}`;
    let exists = await RNFetchBlob.fs.exists(path);
    if (!exists) {
      return false;
    }
    let output = await Sodium.decryptFile(
      key,
      {
        ...cipherData,
        hash: filename
      },
      true
    );
    console.log('output length: ', output?.length);
    return output;
  } catch (e) {
    return false;
  }
}

async function writeEncrypted(filename, {data, type, key}) {
  console.log('file input: ', {data, type, key});

  let output = await Sodium.encryptFile(key, {
    data,
    type
  });
  console.log('encrypted file output: ', output);
  return {
    ...output,
    alg: `xcha-argon2i13`
  };
}

async function uploadFile(filename, {url, headers}, cancelToken) {
  console.log('uploading file: ', filename, headers);

  try {
    let request = RNFetchBlob.config({
      IOSBackgroundTask: true
    })
      .fetch(
        'PUT',
        url,
        {
          'content-type': ''
        },
        RNFetchBlob.wrap(`${cacheDir}/${filename}`)
      )
      .uploadProgress((sent, total) => {
        useAttachmentStore
          .getState()
          .setProgress(sent, total, filename, 0, 'upload');
        console.log('uploading: ', sent, total);
      });
    cancelToken.cancel = request.cancel;
    let response = await request;
    console.log(response.info().status);
    let status = response.info().status;
    useAttachmentStore.getState().remove(filename);
    return status >= 200 && status < 300;
  } catch (e) {
    useAttachmentStore.getState().remove(filename);
    console.log('upload file: ', e, url, headers);
    return false;
  }
}

async function downloadFile(filename, {url, headers}, cancelToken) {
  console.log('downloading file: ', filename, url);
  try {
    let path = `${cacheDir}/${filename}`;
    let exists = await RNFetchBlob.fs.exists(path);
    if (exists) return true;
    let request = RNFetchBlob.config({
      path: path,
      IOSBackgroundTask: true,
    })
      .fetch('GET', url, headers)
      .progress((recieved, total) => {
        useAttachmentStore
          .getState()
          .setProgress(0, total, filename, recieved, 'download');
        console.log('downloading: ', recieved, total);
      });
    cancelToken.cancel = request.cancel;
    let response = await request;
    let status = response.info().status;
    useAttachmentStore.getState().remove(filename);
    return status >= 200 && status < 300;
  } catch (e) {
    useAttachmentStore.getState().remove(filename);
    console.log('download file error: ', e, url, headers);
    return false;
  }
}

async function deleteFile(filename, {url, headers}) {
  console.log('deleting file', filename);
  try {
    let response = await RNFetchBlob.fetch('DELETE', url, headers);
    let status = response.info().status;
    return status >= 200 && status < 300;
  } catch (e) {
    console.log('delete file: ', e, url, headers);
    return false;
  }
}

async function exists(filename) {
  let exists = await RNFetchBlob.fs.exists(`${cacheDir}/${filename}`);
  return exists;
}

function cancelable(operation) {
  const cancelToken = {
    cancel: () => {}
  };
  return (filename, {url, headers}) => {
    return {
      execute: () => operation(filename, {url, headers}, cancelToken),
      cancel: () => cancelToken.cancel()
    };
  };
}

export default {
  readEncrypted,
  writeEncrypted,
  uploadFile: cancelable(uploadFile),
  downloadFile: cancelable(downloadFile),
  deleteFile,
  exists
};
