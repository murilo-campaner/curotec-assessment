import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import type { Post, CreatePostData, UpdatePostData } from '../types/post';

interface PostFormProps {
  post?: Post | null;
  onSubmit: (data: CreatePostData | UpdatePostData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  post,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false
  });

  const isEditing = !!post;

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        published: post.published
      });
    } else {
      setFormData({
        title: '',
        content: '',
        published: false
      });
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title *"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Enter the post title..."
      />

      <Textarea
        label="Content *"
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
        rows={8}
        placeholder="Enter the post content..."
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          name="published"
          checked={formData.published}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
          Publish immediately
        </label>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={!formData.title.trim() || !formData.content.trim()}
        >
          {isLoading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
