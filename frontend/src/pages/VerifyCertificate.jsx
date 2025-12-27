import { useState } from 'react';
import { verifyCertificate } from '../utils/api';
import {
  Search,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Building,
  BookOpen,
  Award,
} from 'lucide-react';

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCertificate(null);
    setLoading(true);

    try {
      const response = await verifyCertificate(certId);
      setCertificate(response);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Certificate not found or verification failed'
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-sky-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Verify Certificate
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter the certificate ID to verify its authenticity
          </p>
        </div>

        <div className="card p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Certificate ID
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="input-field flex-1"
                  placeholder="Enter certificate ID (64 character hash)"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-6 flex items-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>{loading ? 'Verifying...' : 'Verify'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {error && (
          <div className="card p-6 border-2 border-red-500">
            <div className="flex items-start space-x-3">
              <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-1">
                  Verification Failed
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {certificate && (
          <div className="card p-8">
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-3">
                {certificate.valid ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                        Valid Certificate
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        This certificate has been verified on the blockchain
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                        Revoked Certificate
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        This certificate has been revoked
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-sky-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Student Name
                    </div>
                    <div className="font-semibold">{certificate.name}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-sky-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Course
                    </div>
                    <div className="font-semibold">{certificate.course}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-sky-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Organization
                    </div>
                    <div className="font-semibold">
                      {certificate.organization}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-sky-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Issued Date
                    </div>
                    <div className="font-semibold">
                      {new Date(certificate.issuedAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-sky-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Issuer Address
                    </div>
                    <div className="font-mono text-xs break-all">
                      {certificate.issuer}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-sky-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Certificate ID
                    </div>
                    <div className="font-mono text-xs break-all">
                      {certificate.certId}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {certificate.ipfsCid && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  IPFS Metadata CID
                </div>
                <code className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-xs break-all">
                  {certificate.ipfsCid}
                </code>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${certificate.ipfsCid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-sky-600 hover:text-sky-700 underline"
                >
                  View on IPFS
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;
