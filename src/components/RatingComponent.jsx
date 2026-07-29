import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Star, Send, CheckCircle2 } from 'lucide-react';

const RatingComponent = () => {
  const [rating, setRating] = useState(0); // 1 to 5 stars
  const [mood, setMood] = useState(null); // 'Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Face Emoticons List
  const moodList = [
    { label: 'Very Bad', emoji: '😡', color: 'hover:bg-red-100 border-red-200' },
    { label: 'Bad', emoji: '🙁', color: 'hover:bg-orange-100 border-orange-200' },
    { label: 'Neutral', emoji: '😐', color: 'hover:bg-yellow-100 border-yellow-200' },
    { label: 'Good', emoji: '😊', color: 'hover:bg-blue-100 border-blue-200' },
    { label: 'Very Good', emoji: '😍', color: 'hover:bg-emerald-100 border-emerald-200' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 && !mood) {
      alert("Please select at least a star rating or a face emoticon!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "app_feedbacks"), {
        rating,
        mood: mood || 'Not Selected',
        feedbackText,
        timestamp: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving feedback: ", error);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 font-sans">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <span className="bg-orange-100 text-orange-600 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
              Feedback & Rating
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-2 tracking-tight">
              How was your experience?
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Your feedback helps us improve Apni Manzil services.
            </p>
          </div>

          {/* Face Emojis Section */}
          <div className="flex justify-between items-center gap-2 pt-2">
            {moodList.map((item, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setMood(item.label)}
                className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                  mood === item.label 
                    ? 'border-orange-500 bg-orange-50 scale-110 shadow-md' 
                    : `border-slate-100 bg-slate-50 ${item.color}`
                }`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-[9px] font-bold text-slate-600 mt-1">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Star Rating Section */}
          <div className="flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs font-black text-slate-700 mb-2 uppercase tracking-wide">Star Rating</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    size={28}
                    className={`${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text Box */}
          <div>
            <textarea
              rows="3"
              placeholder="Any suggestions or feedback? (Optional)"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 font-medium text-xs text-slate-800 outline-none focus:border-[#002D5E] focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#002D5E] hover:bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition active:scale-95"
          >
            <Send size={16} />
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      ) : (
        /* Thank You Screen */
        <div className="text-center py-8 space-y-3">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="text-xl font-black text-slate-900">Thank You Very Much!</h3>
          <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
            Your valuable feedback has been received. This will help us improve our services further.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setRating(0);
              setMood(null);
              setFeedbackText('');
            }}
            className="mt-4 text-xs font-bold text-blue-600 hover:underline"
          >
            Give Another Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingComponent;