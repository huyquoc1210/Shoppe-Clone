import { maxSizeUploadAvatar } from 'constants/maxSizeAvatar';
import { useRef, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

interface FromInputFileProps {
  onChange?: (file?: File) => void;
}

const FromInputFile = (props: FromInputFileProps) => {
  const { onChange } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileFormLocal = event.target.files?.[0];
    if (
      fileFormLocal &&
      (fileFormLocal.size >= maxSizeUploadAvatar || !fileFormLocal.type.includes('image'))
    ) {
      toast.error('Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG', {
        position: 'top-center'
      });
    } else {
      onChange && onChange(fileFormLocal);
    }
    event.target.value = '';
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
      <input
        type='file'
        className='hidden'
        accept='.jpg,.png,.jpeg'
        ref={fileInputRef}
        onChange={onFileChange}
      />
      <button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </>
  );
};

export default FromInputFile;
