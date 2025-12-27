import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Globe, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-sky-600" />,
      title: 'Blockchain Secured',
      description:
        'Certificates are stored on Ethereum blockchain, ensuring immutability and transparency.',
    },
    {
      icon: <Lock className="w-12 h-12 text-sky-600" />,
      title: 'Tamper-Proof',
      description:
        'Once issued, certificates cannot be altered or forged, maintaining their integrity.',
    },
    {
      icon: <Globe className="w-12 h-12 text-sky-600" />,
      title: 'Decentralized Storage',
      description:
        'Documents are stored on IPFS, providing distributed and reliable access worldwide.',
    },
    {
      icon: <Zap className="w-12 h-12 text-sky-600" />,
      title: 'Instant Verification',
      description:
        'Verify any certificate instantly using its unique ID, anywhere, anytime.',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Secure Digital Certificates on
            <span className="text-sky-600 dark:text-sky-400">
              {' '}
              Blockchain
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Issue, manage, and verify educational certificates with the power of
            blockchain technology and IPFS storage. Transparent, immutable, and
            accessible.
          </p>
          <div className="flex justify-center space-x-4">
            {!isAuthenticated && (
              <button
                onClick={() => navigate('/login')}
                className="btn-primary px-8 py-3 text-lg"
              >
                Get Started
              </button>
            )}
            <button
              onClick={() => navigate('/verify')}
              className="btn-secondary px-8 py-3 text-lg"
            >
              Verify Certificate
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-6 hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="card p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Issue Certificate</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Authorized issuers upload certificate details and PDF documents
                to the platform.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Blockchain Recording
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Certificate metadata is stored on IPFS and recorded on Ethereum
                blockchain.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Instant Verification
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Anyone can verify certificate authenticity using the unique
                certificate ID.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
