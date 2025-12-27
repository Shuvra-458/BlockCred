import { useState } from 'react';
import { issueCertificate } from '../utils/api';
import { Upload, FileText, AlertCircle, CheckCircle, Copy } from 'lucide-react';

const IssueCertificate = () => {
  const [formData, setFormData] = useState({
    name: '',
    registration_number: '',
    organization: '',
    course: '',
    marks: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);
    setLoading(true);

    if (!file) {
      setError('Please upload a certificate PDF');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('registration_number', formData.registration_number);
    data.append('organization', formData.organization);
    data.append('course', formData.course);
    data.append('marks', formData.marks);
    data.append('file', file);

    try {
      const response = await issueCertificate(data);
      setSuccess(response);
      setFormData({
        name: '',
        registration_number: '',
        organization: '',
        course: '',
        marks: '',
      });
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to issue certificate');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Issue Certificate
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create a new blockchain-secured certificate
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-red-600 dark:text-red-400">
              {error}
            </span>
          </div>
        )}

        {success && (
          <div className="mb-6 card p-6">
            <div className="flex items-start space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-1">
                  Certificate Issued Successfully!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The certificate has been recorded on the blockchain and stored
                  on IPFS.
                </p>
              </div>
            </div>
            <div className="space-y-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Certificate ID
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="flex-1 text-sm bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 break-all">
                    {success.certId}
                  </code>
                  <button
                    onClick={() => copyToClipboard(success.certId)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Metadata CID
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="flex-1 text-sm bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 break-all">
                    {success.metadataCid}
                  </code>
                  <button
                    onClick={() => copyToClipboard(success.metadataCid)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  PDF CID
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="flex-1 text-sm bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 break-all">
                    {success.pdfCid}
                  </code>
                  <button
                    onClick={() => copyToClipboard(success.pdfCid)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registration_number"
                  value={formData.registration_number}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="REG12345"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="University Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Computer Science"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Marks/Grade
                </label>
                <input
                  type="text"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="85% / A Grade"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Certificate PDF
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-sky-500 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  {file ? (
                    <>
                      <FileText className="w-12 h-12 text-green-600" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        Click to change file
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400" />
                      <span className="text-sm font-medium">
                        Click to upload PDF
                      </span>
                      <span className="text-xs text-gray-500">
                        Only PDF files are accepted
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg"
            >
              {loading ? 'Issuing Certificate...' : 'Issue Certificate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueCertificate;
