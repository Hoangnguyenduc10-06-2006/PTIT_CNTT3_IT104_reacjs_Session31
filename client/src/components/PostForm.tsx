import { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import ReactMarkdown from 'react-markdown'; 
import { createPost, updatePost } from '../services/api'; 

interface PostFormProps {
  currentPost: string; 
  onSuccess: () => void;
  onCancel: () => void;
  existingTitles: string[]; 
}

export default function PostForm({ currentPost, onSuccess, onCancel }: PostFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentPost) {
      form.setFieldsValue(currentPost);
    } else {
      form.resetFields(); 
    }
  }, [currentPost, form]);


    const handleSubmit = async (values: any) => {
  const postData = {
    ...values,
    date: new Date(), 
    status: 'Đã xuất bán', 
  };

  let result;
  if (currentPost) {
    result = await updatePost(currentPost.id, postData);
    if (result) {
      message.success('Cập nhật thành công');
    } else {
      message.error('Lỗi khi cập nhật dữ liệu');
      return;
    }
  } else {
    result = await createPost(postData);
    if (result) {
      message.success('Thêm mới thành công');
    } else {
      message.error('Lỗi khi thêm dữ liệu');
      return;
    }
  }

  onSuccess(); 
};

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="title" label="Tên bài viết" rules={[{ required: true, message: 'Không được để trống' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="image" label="Hình ảnh (URL)" rules={[{ required: true, message: 'Không được để trống' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Nội dung (Markdown)" rules={[{ required: true, message: 'Không được để trống' }]}>
        <Input.TextArea rows={6} />
      </Form.Item>

      {/* Preview Markdown */}
      <div style={{ marginBottom: 16 }}>
        <strong>Preview nội dung:</strong>
        <div style={{ border: '1px solid #ddd', padding: 8 }}>
          <ReactMarkdown>{form.getFieldValue('content')}</ReactMarkdown>
        </div>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          {currentPost ? 'Cập nhật' : 'Lưu mới'}
        </Button>
        <Button onClick={onCancel}>Hủy</Button>
      </Form.Item>
    </Form>
  );
}