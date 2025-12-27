import { useNavigate } from 'react-router-dom';
import { FileCheck, Shield, Plus } from 'lucide-react';

const IssuerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Issuer Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Issue and manage blockchain certificates
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div
            className="card p-6 hover:shadow-xl transition-all cursor-pointer"
            onClick={() => navigate('/issue')}
          >
            <div className="flex items-center justify-between mb-4">
              <Plus className="w-12 h-12 text-sky-600" />
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  New
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Issue Certificate</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create and issue a new certificate on the blockchain
            </p>
          </div>

          <div
            className="card p-6 hover:shadow-xl transition-all cursor-pointer"
            onClick={() => navigate('/verify')}
          >
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Verify Certificate
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check the authenticity of any issued certificate
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <FileCheck className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your Role</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Certificate Issuer
            </p>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-semibold mb-6">Quick Guide</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">
                Issuing Certificates
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Upload certificate PDF document</li>
                <li>• Fill in student and course details</li>
                <li>• Submit to record on blockchain</li>
                <li>• Share certificate ID with recipient</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Certificate Data</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Stored on IPFS for decentralization</li>
                <li>• Recorded on Ethereum blockchain</li>
                <li>• Immutable and tamper-proof</li>
                <li>• Instantly verifiable worldwide</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuerDashboard;
