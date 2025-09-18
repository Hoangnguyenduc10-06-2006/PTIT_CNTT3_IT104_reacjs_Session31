import { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Modal, message } from 'antd'; 
import { getPosts, deletePost } from '../services/api'; 
import PostForm from './PostForm'; 
import '../components/Article.css'; 

const { Search } = Input;
const { Option } = Select;

export default function ListPost() {
  const [posts, setPosts] = useState([]); 
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu');
    }
  };

  // Mở modal add mới
  const showAddModal = () => {
    setCurrentPost(null);
    setIsModalOpen(true);
  };

  // Mở modal edit
  const showEditModal = (post: any) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // refresh list
  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchPosts();
  };

  // Xóa bài viết
  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      message.success('Xóa thành công');
      fetchPosts();
    } catch (error) {
      message.error('Lỗi khi xóa');
    }
  };

  // Tìm kiếm theo từ khóa
  const handleSearch = (value: string) => {
    const filtered = posts.filter((post: any) => post.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredPosts(filtered);
  };

  // Filter theo trạng thái
  const handleFilter = (value: string) => {
    if (!value) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post: any) => post.status === value);
      setFilteredPosts(filtered);
    }
  };

  const columns = [
    { title: 'STT', dataIndex: 'id', key: 'id', render: (text: string, index: number) => index + 1 },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img src={image} alt="img" style={{ width: 60, height: 60, borderRadius: '50%' }} />,
    },
    { title: 'Ngày viết', dataIndex: 'date', key: 'date' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <span className="status">{status}</span>,
    },
    {
      title: 'Chức năng',
      key: 'action',
      render: (text: string) => (
        <>
          <Button type="primary" onClick={() => showEditModal(record)} style={{ marginRight: 8 }}>Sửa</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="header">
        <div className="header-left">
          <Search placeholder="Nhập từ khóa tìm kiếm" onSearch={handleSearch} style={{ width: 300 }} />
          <Select defaultValue="" onChange={handleFilter} style={{ width: 150 }}>
            <Option value="">Lọc bài viết</Option>
            <Option value="Đã xuất bản">Đã xuất bản</Option>
            <Option value="Nháp">abc</Option>
          
          </Select>
        </div>
        <Button type="primary" onClick={showAddModal}>Thêm mới bài viết</Button>
      </div>

      <Table columns={columns} dataSource={filteredPosts} rowKey="id" />

      <Modal
        title={currentPost ? 'Cập nhật bài viết' : 'Thêm mới bài viết'} // đổi title
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <PostForm
          currentPost={currentPost}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          existingTitles={posts.map((p:string) => p.title)} 
        />
      </Modal>
    </div>
  );
}