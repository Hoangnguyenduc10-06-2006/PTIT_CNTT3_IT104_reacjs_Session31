import { useState } from "react";
import "./Modal.css";

interface ModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("draft");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, date, status });
    onClose(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Thêm bài viết</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tiêu đề</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Ngày viết</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Trạng thái</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Nháp</option>
              <option value="published">Đã xuất bản</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-edit">
              Lưu
            </button>
            <button type="button" className="btn btn-delete" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
