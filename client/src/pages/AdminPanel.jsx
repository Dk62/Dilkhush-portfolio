import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaEnvelope, FaBriefcase, FaFileAlt, FaUpload } from 'react-icons/fa';

const AdminPanel = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [activeTab, setActiveTab] = useState('projects');
  
  // Login State
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  
  // Data State
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState(null);
  
  // Project Form State
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [projectData, setProjectData] = useState({
    title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: '', featured: false
  });

  // Content Form State
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  // Education & Certification Form State
  const [eduForm, setEduForm] = useState({ degree: '', institution: '', duration: '', score: '' });
  const [eduEditingIndex, setEduEditingIndex] = useState(null);
  const [certForm, setCertForm] = useState({ title: '', issuer: '', date: '', verificationLink: '' });
  const [certEditingIndex, setCertEditingIndex] = useState(null);
  
  // Auth Form State
  const [isLoginView, setIsLoginView] = useState(true);
  const [isForgotView, setIsForgotView] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [submittingForgot, setSubmittingForgot] = useState(false);
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  // --- API Configuration ---
  const api = axios.create({
    baseURL: '/api',
  });

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // --- Login Logic ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/admin/login', loginData);
      setToken(data.token);
      localStorage.setItem('adminToken', data.token);
      toast.success('Login successful');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    try {
      const { data } = await api.post('/admin/register', {
        username: registerData.username,
        email: registerData.email || undefined,
        password: registerData.password
      });
      setToken(data.token);
      localStorage.setItem('adminToken', data.token);
      toast.success('Registration successful! Welcome admin');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      return toast.error('Please enter your recovery email');
    }
    setSubmittingForgot(true);
    try {
      await api.post('/admin/forgot-password', { email: forgotEmail });
      toast.success('Password reset link sent to your email!');
      setForgotEmail('');
      setIsForgotView(false);
    } catch (error) {
      console.error(error);
      toast.toast ? toast.error(error.response?.data?.message || 'Failed to send recovery email') : toast.error(error.response?.data?.message || 'Failed to send recovery email');
    } finally {
      setSubmittingForgot(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
    setProjects([]);
    setMessages([]);
    setContent(null);
  };

  // --- Fetch Data ---
  const fetchData = async () => {
    if (!token) return;
    try {
      if (activeTab === 'projects') {
        const { data } = await api.get('/projects');
        setProjects(data);
      } else if (activeTab === 'messages') {
        const { data } = await api.get('/contact/messages');
        setMessages(data);
      } else if (activeTab === 'content') {
        const { data } = await api.get('/content');
        setContent(data);
      }
    } catch (error) {
      toast.error(`Failed to fetch ${activeTab}`);
      if (error.response?.status === 401) handleLogout();
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, activeTab]);

  // --- Project CRUD Logic ---
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...projectData,
      techStack: typeof projectData.techStack === 'string' 
        ? projectData.techStack.split(',').map(s => s.trim()) 
        : projectData.techStack
    };

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, formattedData);
        toast.success('Project updated');
      } else {
        await api.post('/projects', formattedData);
        toast.success('Project created');
      }
      setShowProjectForm(false);
      setEditingId(null);
      setProjectData({ title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: '', featured: false });
      fetchData();
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const editProject = (project) => {
    setProjectData({
      ...project,
      techStack: project.techStack.join(', ')
    });
    setEditingId(project._id);
    setShowProjectForm(true);
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        toast.success('Project deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  // --- Content Logic ---
  const handleContentUpdate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      await api.put('/content', {
        hero: content.hero,
        about: content.about,
        resumeUrl: content.resumeUrl,
        skills: content.skills,
        education: content.education || [],
        certifications: content.certifications || []
      });
      toast.success('Content saved successfully to database');
    } catch (error) {
      toast.error('Failed to update content');
    }
  };

  const handleEduSubmit = (e) => {
    e.preventDefault();
    if (!eduForm.degree || !eduForm.institution || !eduForm.duration) {
      return toast.error('Degree, Institution, and Duration are required');
    }
    const newEduList = [...(content.education || [])];
    if (eduEditingIndex !== null) {
      newEduList[eduEditingIndex] = eduForm;
      setEduEditingIndex(null);
    } else {
      newEduList.push(eduForm);
    }
    setContent({ ...content, education: newEduList });
    setEduForm({ degree: '', institution: '', duration: '', score: '' });
    toast.success(eduEditingIndex !== null ? 'Education item updated in list' : 'Education item added to list');
  };

  const deleteEduItem = (index) => {
    const newEduList = [...(content.education || [])];
    newEduList.splice(index, 1);
    setContent({ ...content, education: newEduList });
    toast.success('Education item removed from list');
  };

  const handleCertSubmit = (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer || !certForm.date) {
      return toast.error('Title, Issuer, and Date are required');
    }
    const newCertList = [...(content.certifications || [])];
    if (certEditingIndex !== null) {
      newCertList[certEditingIndex] = certForm;
      setCertEditingIndex(null);
    } else {
      newCertList.push(certForm);
    }
    setContent({ ...content, certifications: newCertList });
    setCertForm({ title: '', issuer: '', date: '', verificationLink: '' });
    toast.success(certEditingIndex !== null ? 'Certification item updated in list' : 'Certification item added to list');
  };

  const deleteCertItem = (index) => {
    const newCertList = [...(content.certifications || [])];
    newCertList.splice(index, 1);
    setContent({ ...content, certifications: newCertList });
    toast.success('Certification item removed from list');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      const { data } = await api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProjectData(prev => ({ ...prev, image: data.secure_url }));
      toast.success('Image uploaded to Cloudinary');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) return toast.error('Please select a file');
    
    const formData = new FormData();
    formData.append('resume', resumeFile);

    setUploadingResume(true);
    try {
      const { data } = await api.post('/content/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setContent({ ...content, resumeUrl: data.resumeUrl });
      toast.success('Resume uploaded successfully');
      setResumeFile(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload resume');
    } finally {
      setUploadingResume(false);
    }
  };

  // --- Render Login / Register View ---
  if (!token) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl transition-all duration-300">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Admin <span className="text-emerald-400">{isForgotView ? 'Recovery' : isLoginView ? 'Login' : 'Register'}</span>
          </h2>
          <p className="text-slate-400 text-center text-sm mb-8">
            {isForgotView ? 'Recover your administrative password' : isLoginView ? 'Sign in to manage your portfolio' : 'Create an administrative account'}
          </p>

          {isForgotView ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Recovery Email</label>
                <input 
                  type="email" 
                  value={forgotEmail} 
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter recovery email"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={submittingForgot}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-900 font-bold py-3 rounded-lg transition-colors cursor-pointer flex justify-center items-center"
              >
                {submittingForgot ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-slate-900 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          ) : isLoginView ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                <input 
                  type="text" 
                  value={loginData.username} 
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-slate-300">Password</label>
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsForgotView(true);
                      setForgotEmail('');
                    }}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors focus:outline-none cursor-pointer font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input 
                  type="password" 
                  value={loginData.password} 
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded-lg transition-colors cursor-pointer">
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                <input 
                  type="text" 
                  value={registerData.username} 
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Choose username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email (Optional, for recovery)</label>
                <input 
                  type="email" 
                  value={registerData.email} 
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <input 
                  type="password" 
                  value={registerData.password} 
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Choose password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  value={registerData.confirmPassword} 
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded-lg transition-colors cursor-pointer">
                Register
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-700 text-center">
            {isForgotView ? (
              <button 
                type="button" 
                onClick={() => setIsForgotView(false)}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors cursor-pointer focus:outline-none"
              >
                Back to Login
              </button>
            ) : (
              <button 
                type="button" 
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  // Clear inputs on toggle
                  setLoginData({ username: '', password: '' });
                  setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
                }}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors cursor-pointer focus:outline-none"
              >
                {isLoginView ? "Don't have an admin account? Register" : "Already have an account? Login"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- Render Dashboard View ---
  return (
    <div className="py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">
            Portfolio <span className="text-emerald-400">Dashboard</span>
          </h2>
          <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-700 pb-4">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'projects' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <FaBriefcase />
            <span>Manage Projects</span>
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'content' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <FaFileAlt />
            <span>Manage Content</span>
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'messages' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <FaEnvelope />
            <span>View Messages</span>
          </button>
        </div>

        {/* --- Projects Tab --- */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-200">Projects</h3>
              <button 
                onClick={() => {
                  setEditingId(null);
                  setProjectData({ title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: '', featured: false });
                  setShowProjectForm(!showProjectForm);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-lg font-bold transition-colors"
              >
                <FaPlus />
                <span>{showProjectForm ? 'Cancel' : 'Add Project'}</span>
              </button>
            </div>

            {/* Project Form */}
            {showProjectForm && (
              <form onSubmit={handleProjectSubmit} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                  <input type="text" value={projectData.title} onChange={e => setProjectData({...projectData, title: e.target.value})} required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-slate-300">Image URL</label>
                    <span className="text-xs text-slate-400">or Upload to Cloudinary</span>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={projectData.image} 
                      onChange={e => setProjectData({...projectData, image: e.target.value})} 
                      required 
                      className="flex-grow bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm" 
                      placeholder="https://res.cloudinary.com/..."
                    />
                    <div className="relative shrink-0">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="project-image-file"
                        disabled={uploadingImage}
                      />
                      <label 
                        htmlFor="project-image-file" 
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border border-dashed transition-all duration-300 cursor-pointer font-medium h-full text-xs ${
                          uploadingImage 
                            ? 'border-slate-600 bg-slate-800 text-slate-400' 
                            : 'border-emerald-500/50 hover:border-emerald-400 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                      >
                        {uploadingImage ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <FaUpload size={12} />
                            <span>Upload</span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                  {projectData.image && (
                    <div className="relative w-20 h-14 rounded-lg border border-slate-700 overflow-hidden bg-slate-900 mt-1.5 shadow-md">
                      <img 
                        src={projectData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200';
                        }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setProjectData({...projectData, image: ''})} 
                        className="absolute top-0.5 right-0.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-0.5 shadow transition-colors"
                        title="Clear Image"
                      >
                        <FaTrash size={8} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                  <textarea value={projectData.description} onChange={e => setProjectData({...projectData, description: e.target.value})} required rows="3" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Tech Stack (comma separated)</label>
                  <input type="text" value={projectData.techStack} onChange={e => setProjectData({...projectData, techStack: e.target.value})} required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">GitHub Link</label>
                  <input type="text" value={projectData.githubLink} onChange={e => setProjectData({...projectData, githubLink: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Live Link</label>
                  <input type="text" value={projectData.liveLink} onChange={e => setProjectData({...projectData, liveLink: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="flex items-center md:col-span-2">
                  <input type="checkbox" checked={projectData.featured} onChange={e => setProjectData({...projectData, featured: e.target.checked})} className="mr-2 w-4 h-4 text-emerald-500 bg-slate-900 border-slate-700 rounded focus:ring-emerald-500 focus:ring-2" />
                  <label className="text-sm font-medium text-slate-300">Featured Project</label>
                </div>
                <div className="md:col-span-2 text-right">
                  <button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-lg font-bold transition-colors">
                    {editingId ? 'Update Project' : 'Save Project'}
                  </button>
                </div>
              </form>
            )}

            {/* Projects List */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-slate-400 text-sm">
                  <tr>
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4 hidden md:table-cell">Tech Stack</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {projects.map((project) => (
                    <tr key={project._id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img src={project.image} alt={project.title} className="w-12 h-12 rounded object-cover" />
                          <div>
                            <p className="font-bold text-slate-200">{project.title}</p>
                            <p className="text-xs text-slate-400 truncate max-w-xs">{project.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-xs bg-slate-900 text-emerald-400 px-2 py-1 rounded">{t}</span>
                          ))}
                          {project.techStack.length > 3 && <span className="text-xs text-slate-400">+{project.techStack.length - 3}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button onClick={() => editProject(project)} className="text-blue-400 hover:text-blue-300"><FaEdit size={18} /></button>
                          <button onClick={() => deleteProject(project._id)} className="text-red-400 hover:text-red-300"><FaTrash size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-400">No projects found. Create one above.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- Content Tab --- */}
        {activeTab === 'content' && content && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Text Content Form */}
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-2xl font-bold text-slate-200 mb-6">Page Content</h3>
                <form onSubmit={handleContentUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Hero Headline</label>
                    <input type="text" value={content.hero.headline} onChange={e => setContent({...content, hero: {...content.hero, headline: e.target.value}})} required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Hero Sub-Headline</label>
                    <textarea value={content.hero.subHeadline} onChange={e => setContent({...content, hero: {...content.hero, subHeadline: e.target.value}})} required rows="2" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Hero Typing Text (use | for multiple)</label>
                    <input type="text" value={content.hero.typingText} onChange={e => setContent({...content, hero: {...content.hero, typingText: e.target.value}})} required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">About Me Text</label>
                    <textarea value={content.about.text} onChange={e => setContent({...content, about: {...content.about, text: e.target.value}})} required rows="5" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white resize-none"></textarea>
                  </div>
                  <div className="text-right">
                    <button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-lg font-bold transition-colors">
                      Save Content Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Skills Form */}
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-2xl font-bold text-slate-200 mb-6">Manage Skills</h3>
                <form onSubmit={handleContentUpdate} className="space-y-6">
                  {content.skills.map((skill, index) => (
                    <div key={index} className="p-4 bg-slate-900 rounded-lg border border-slate-700 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-emerald-400">Category {index + 1}</h4>
                        <button type="button" onClick={() => {
                          const newSkills = [...content.skills];
                          newSkills.splice(index, 1);
                          setContent({...content, skills: newSkills});
                        }} className="text-red-400 hover:text-red-300"><FaTrash /></button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Category Name</label>
                          <input type="text" value={skill.category} onChange={e => {
                            const newSkills = [...content.skills];
                            newSkills[index].category = e.target.value;
                            setContent({...content, skills: newSkills});
                          }} className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Icon Name (e.g. FaReact)</label>
                          <input type="text" value={skill.icon} onChange={e => {
                            const newSkills = [...content.skills];
                            newSkills[index].icon = e.target.value;
                            setContent({...content, skills: newSkills});
                          }} className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-slate-400 mb-1">Skills (comma separated)</label>
                          <input type="text" value={skill.items.join(', ')} onChange={e => {
                            const newSkills = [...content.skills];
                            newSkills[index].items = e.target.value.split(',').map(s => s.trim());
                            setContent({...content, skills: newSkills});
                          }} className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center pt-4">
                    <button type="button" onClick={() => {
                      setContent({...content, skills: [...content.skills, { category: 'New Category', icon: 'FaCode', items: [] }]});
                    }} className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-medium">
                      <FaPlus size={14} /> <span>Add Category</span>
                    </button>
                    <button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-lg font-bold transition-colors">
                      Save Skills
                    </button>
                  </div>
                </form>
              </div>

              {/* Education Form */}
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mt-8">
                <h3 className="text-2xl font-bold text-slate-200 mb-6">Manage Education</h3>
                
                {/* Current Education List */}
                <div className="mb-6 space-y-3">
                  {(content.education || []).map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-slate-900 rounded-lg border border-slate-700">
                      <div>
                        <p className="font-bold text-white text-sm">{edu.degree}</p>
                        <p className="text-xs text-slate-400">{edu.institution} • {edu.duration} {edu.score ? `• ${edu.score}` : ''}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button type="button" onClick={() => {
                          setEduForm(edu);
                          setEduEditingIndex(idx);
                        }} className="text-blue-400 hover:text-blue-300 transition-colors">
                          <FaEdit size={14} />
                        </button>
                        <button type="button" onClick={() => deleteEduItem(idx)} className="text-red-400 hover:text-red-300 transition-colors">
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {(content.education || []).length === 0 && (
                    <p className="text-xs text-slate-500 italic">No education history added yet.</p>
                  )}
                </div>

                {/* Add/Edit form */}
                <form onSubmit={handleEduSubmit} className="space-y-4 border-t border-slate-700 pt-4">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                    {eduEditingIndex !== null ? 'Edit Education Item' : 'Add Education Item'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Degree / Field of Study *</label>
                      <input 
                        type="text" 
                        value={eduForm.degree} 
                        onChange={e => setEduForm({...eduForm, degree: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-750 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500" 
                        placeholder="e.g. BCA, Class XII"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Institution / School *</label>
                      <input 
                        type="text" 
                        value={eduForm.institution} 
                        onChange={e => setEduForm({...eduForm, institution: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-750 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500" 
                        placeholder="e.g. Patna University"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Duration *</label>
                      <input 
                        type="text" 
                        value={eduForm.duration} 
                        onChange={e => setEduForm({...eduForm, duration: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-750 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500" 
                        placeholder="e.g. 2023 - 2026, 2021 - 2023"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Score / Grade (Optional)</label>
                      <input 
                        type="text" 
                        value={eduForm.score} 
                        onChange={e => setEduForm({...eduForm, score: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-750 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500" 
                        placeholder="e.g. 8.9 CGPA, 92%" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <button type="submit" className="px-4 py-1.5 bg-slate-900 hover:bg-slate-750 border border-slate-700 text-emerald-400 font-semibold text-xs rounded transition-colors cursor-pointer">
                      {eduEditingIndex !== null ? 'Update Item in List' : 'Add Item to List'}
                    </button>
                    {eduEditingIndex !== null && (
                      <button 
                        type="button" 
                        onClick={() => {
                          setEduEditingIndex(null);
                          setEduForm({ degree: '', institution: '', duration: '', score: '' });
                        }}
                        className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>

                {/* Persistence button */}
                <div className="text-right border-t border-slate-700 mt-6 pt-4">
                  <button type="button" onClick={handleContentUpdate} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-lg font-bold transition-colors cursor-pointer">
                    Save Education Changes
                  </button>
                </div>
              </div>

              {/* Certifications Form */}
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mt-8">
                <h3 className="text-2xl font-bold text-slate-200 mb-6">Manage Certifications</h3>
                
                {/* Current Certifications List */}
                <div className="mb-6 space-y-3">
                  {(content.certifications || []).map((cert, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-slate-900 rounded-lg border border-slate-700">
                      <div>
                        <p className="font-bold text-white text-sm">{cert.title}</p>
                        <p className="text-xs text-slate-400">{cert.issuer} • {cert.date} {cert.verificationLink ? '• Link Added' : ''}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button type="button" onClick={() => {
                          setCertForm(cert);
                          setCertEditingIndex(idx);
                        }} className="text-blue-400 hover:text-blue-300 transition-colors">
                          <FaEdit size={14} />
                        </button>
                        <button type="button" onClick={() => deleteCertItem(idx)} className="text-red-400 hover:text-red-300 transition-colors">
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {(content.certifications || []).length === 0 && (
                    <p className="text-xs text-slate-500 italic">No certifications added yet.</p>
                  )}
                </div>

                {/* Add/Edit Form */}
                <form onSubmit={handleCertSubmit} className="space-y-4 border-t border-slate-700 pt-4">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                    {certEditingIndex !== null ? 'Edit Certification Item' : 'Add Certification Item'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Certification Title *</label>
                      <input 
                        type="text" 
                        value={certForm.title} 
                        onChange={e => setCertForm({...certForm, title: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-750 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500" 
                        placeholder="e.g. AWS Certified Developer"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Issuing Organization *</label>
                      <input 
                        type="text" 
                        value={certForm.issuer} 
                        onChange={e => setCertForm({...certForm, issuer: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-750 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500" 
                        placeholder="e.g. Amazon Web Services"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Date Issued *</label>
                      <input 
                        type="text" 
                        value={certForm.date} 
                        onChange={e => setCertForm({...certForm, date: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-750 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500" 
                        placeholder="e.g. May 2025"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Credential URL / Verification Link (Optional)</label>
                      <input 
                        type="text" 
                        value={certForm.verificationLink} 
                        onChange={e => setCertForm({...certForm, verificationLink: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-750 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500" 
                        placeholder="e.g. https://credly.com/..." 
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <button type="submit" className="px-4 py-1.5 bg-slate-900 hover:bg-slate-750 border border-slate-700 text-emerald-400 font-semibold text-xs rounded transition-colors cursor-pointer">
                      {certEditingIndex !== null ? 'Update Item in List' : 'Add Item to List'}
                    </button>
                    {certEditingIndex !== null && (
                      <button 
                        type="button" 
                        onClick={() => {
                          setCertEditingIndex(null);
                          setCertForm({ title: '', issuer: '', date: '', verificationLink: '' });
                        }}
                        className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>

                {/* Persistence button */}
                <div className="text-right border-t border-slate-700 mt-6 pt-4">
                  <button type="button" onClick={handleContentUpdate} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-lg font-bold transition-colors cursor-pointer">
                    Save Certifications Changes
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Resume Upload */}
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-2xl font-bold text-slate-200 mb-6">Resume</h3>
                
                <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400 mb-2">Current Resume URL:</p>
                  <a href={content.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline break-all">
                    {content.resumeUrl}
                  </a>
                </div>

                <form onSubmit={handleResumeUpload} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Upload New PDF</label>
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={e => setResumeFile(e.target.files[0])}
                      className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-emerald-500/20 file:text-emerald-400 hover:file:bg-emerald-500/30 transition-all cursor-pointer" 
                    />
                  </div>
                  <button type="submit" disabled={!resumeFile || uploadingResume} className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium">
                    {uploadingResume ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Uploading Resume...</span>
                      </>
                    ) : (
                      <>
                        <FaUpload />
                        <span>Upload Resume</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* --- Messages Tab --- */}
        {activeTab === 'messages' && (
          <div>
             <h3 className="text-2xl font-bold text-slate-200 mb-6">Contact Messages</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {messages.map((msg) => (
                  <div key={msg._id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-white text-lg">{msg.name}</h4>
                        <a href={`mailto:${msg.email}`} className="text-emerald-400 text-sm hover:underline">{msg.email}</a>
                      </div>
                      <span className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mb-2 font-medium text-slate-300 border-b border-slate-700 pb-2">
                      Subject: {msg.subject}
                    </div>
                    <p className="text-slate-400 text-sm mt-2 flex-grow overflow-y-auto max-h-32">
                      {msg.message}
                    </p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="col-span-full text-center py-12 text-slate-400 bg-slate-800 rounded-2xl border border-slate-700">
                    No messages received yet.
                  </div>
                )}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
