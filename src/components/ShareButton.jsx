import { useState } from 'react';
import './ShareButton.css';

function ShareButton({ deal, t }) {
  const [showCopied, setShowCopied] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: deal.title,
      text: `Check out this amazing ${deal.type} deal! ${deal.discount}% off!`,
      url: deal.link || window.location.href
    };

    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
          fallbackShare(shareData);
        }
      }
    } else {
      fallbackShare(shareData);
    }
  };

  const fallbackShare = (data) => {
    setShowFallback(true);
    setTimeout(() => setShowFallback(false), 3000);
  };

  const copyToClipboard = async (data) => {
    const text = `${data.title}\n${data.text}\n${data.url}`;
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setShowFallback(false);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToSocial = (platform, data) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.text)}&url=${encodeURIComponent(data.url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${data.text} ${data.url}`)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.text)}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
    setShowFallback(false);
  };

  return (
    <div className="share-button-container">
      <button
        className="share-button"
        onClick={handleShare}
        aria-label={t?.('share') || 'Share'}
        title={t?.('share') || 'Share'}
      >
        <span className="share-icon">🔗</span>
      </button>

      {showCopied && (
        <div className="share-tooltip copied">
          ✔️ {t?.('copiedToClipboard') || 'Copied!'}
        </div>
      )}

      {showFallback && (
        <div className="share-fallback-menu">
          <div className="share-fallback-header">
            <span>🔗 {t?.('shareVia') || 'Share via'}</span>
            <button 
              className="share-close"
              onClick={() => setShowFallback(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="share-options">
            <button 
              className="share-option"
              onClick={() => copyToClipboard({ title: deal.title, text: `${deal.discount}% off`, url: deal.link })}
            >
              📋 {t?.('copyLink') || 'Copy Link'}
            </button>
            <button 
              className="share-option"
              onClick={() => shareToSocial('whatsapp', { title: deal.title, text: `${deal.discount}% off`, url: deal.link })}
            >
              🟢 WhatsApp
            </button>
            <button 
              className="share-option"
              onClick={() => shareToSocial('twitter', { title: deal.title, text: `${deal.discount}% off`, url: deal.link })}
            >
              🐦 Twitter
            </button>
            <button 
              className="share-option"
              onClick={() => shareToSocial('facebook', { title: deal.title, text: `${deal.discount}% off`, url: deal.link })}
            >
              🔵 Facebook
            </button>
            <button 
              className="share-option"
              onClick={() => shareToSocial('telegram', { title: deal.title, text: `${deal.discount}% off`, url: deal.link })}
            >
              ✈️ Telegram
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShareButton;