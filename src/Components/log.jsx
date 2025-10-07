import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User, Mail, Key, Calendar, CheckCircle, XCircle, LogOut, Edit2, Save, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const supabaseUrl = 'https://hoouzbqbbytojbupofkb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhvb3V6YnFiYnl0b2pidXBvZmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDA2MzAsImV4cCI6MjA3NDkxNjYzMH0.2wqJbaNXWgsFVMnDMMMMO8_dQvr5RH217gOR2tQTryE';

export const supabase = createClient(supabaseUrl, supabaseKey);

const CustomAlert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      bg: 'from-green-500 to-emerald-600',
      icon: <CheckCircle2 className="w-6 h-6" />,
      text: 'text-white'
    },
    error: {
      bg: 'from-red-500 to-rose-600',
      icon: <AlertCircle className="w-6 h-6" />,
      text: 'text-white'
    }
  };

  const style = styles[type] || styles.error;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="fixed top-4 right-4 z-50 max-w-sm mx-4 sm:mx-0"
    >
      <div className={`bg-gradient-to-r ${style.bg} rounded-xl shadow-2xl overflow-hidden`}>
        <div className="p-4 flex items-center gap-3">
          <div className={style.text}>
            {style.icon}
          </div>
          <p className={`flex-1 font-medium ${style.text} text-sm sm:text-base`}>{message}</p>
          <button
            onClick={onClose}
            className={`${style.text} hover:opacity-70 transition-opacity flex-shrink-0`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 5, ease: 'linear' }}
          className="h-1 bg-white/30"
        />
      </div>
    </motion.div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    username: '',
    full_name: '',
    avatar_url: ''
  });
  const [uploading, setUploading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const showAlert = (text, type = 'success') => {
    setAlert({ text, type });
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchProfile(session.user.id);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Ошибка загрузки профиля:', error);
      } else if (data) {
        setProfile(data);
        setProfileForm({
          username: data.username || '',
          full_name: data.full_name || '',
          avatar_url: data.avatar_url || ''
        });
      }
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      let avatarUrl = profileForm.avatar_url;

      if (avatarFile) {
        setUploading(true);
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, {
            upsert: true
          });

        if (uploadError) {
          showAlert('Ошибка загрузки аватара: ' + uploadError.message, 'error');
          setUploading(false);
          setLoading(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        avatarUrl = urlData.publicUrl;
        setUploading(false);
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: profileForm.username,
          full_name: profileForm.full_name,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        });

      if (error) {
        showAlert('Ошибка обновления профиля: ' + error.message, 'error');
      } else {
        showAlert('Профиль успешно обновлен!', 'success');
        await fetchProfile(user.id);
        setIsEditingProfile(false);
        setAvatarFile(null);
      }
    } catch (err) {
      showAlert('Произошла ошибка: ' + err.message, 'error');
    }
    setLoading(false);
  };

  const validateEmail = (value) => {
    if (!value) return 'Email обязателен';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Неверный формат email';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Пароль обязателен';
    if (value.length < 6) return 'Пароль должен быть минимум 6 символов';
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleAuth = async () => {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setEmailError(emailErr);
      setPasswordError(passErr);
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: "http://localhost:5173/dashboard"
          },
        });

        if (signUpError) {
          showAlert('Ошибка регистрации: ' + signUpError.message, 'error');
        } else if (data?.user) {
          if (data.user.identities && data.user.identities.length === 0) {
            showAlert('Этот email уже зарегистрирован. Попробуйте войти.', 'error');
          } else if (data.session) {
            showAlert('Регистрация успешна! Добро пожаловать!', 'success');
          } else {
            showAlert('Регистрация успешна! Проверьте почту для подтверждения.', 'success');
          }
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          let errorMsg = 'Ошибка входа: ' + signInError.message;

          if (signInError.message.includes('Invalid login credentials')) {
            errorMsg = 'Неверный email или пароль';
          } else if (signInError.message.includes('Email not confirmed')) {
            errorMsg = 'Email не подтвержден. Проверьте почту.';
          }

          showAlert(errorMsg, 'error');
        } else if (data?.session) {
          showAlert('Вход выполнен успешно!', 'success');
        }
      }
    } catch (err) {
      showAlert('Произошла ошибка: ' + err.message, 'error');
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showAlert('Ошибка при выходе: ' + error.message, 'error');
    } else {
      setEmail('');
      setPassword('');
      setProfile(null);
      showAlert('Вы успешно вышли из аккаунта', 'success');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'NA';
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указано';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (user) {
    const displayName = profile?.full_name || profile?.username || user.email;
    const isEmailConfirmed = !!user.email_confirmed_at;

    return (
      <>
        <AnimatePresence>
          {alert && (
            <CustomAlert
              message={alert.text}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}
        </AnimatePresence>

        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>

              <div className="relative flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative flex-shrink-0"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Avatar"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white/30 shadow-xl object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-xl">
                      <span className="text-2xl sm:text-3xl font-bold text-white">
                        {getInitials(displayName)}
                      </span>
                    </div>
                  )}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center flex-shrink-0"
                  >
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                  </motion.div>
                </motion.div>

                <div className="text-center sm:text-left">
                  <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 break-words"
                  >
                    {profile?.full_name || 'Велком братиш!'}
                  </motion.h2>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="flex items-center space-x-2 text-white/90 justify-center sm:justify-start text-xs sm:text-sm"
                  >
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="break-all">{user.email}</span>
                  </motion.div>
                  {profile?.username && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center space-x-2 text-white/90 mt-1 justify-center sm:justify-start text-xs sm:text-sm"
                    >
                      <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>@{profile.username}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
              <AnimatePresence mode="wait">
                {isEditingProfile ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">Редактировать профиль</h3>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-blue-900 mb-2">
                        Аватар
                      </label>
                      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0"
                        >
                          {avatarFile ? (
                            <img
                              src={URL.createObjectURL(avatarFile)}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : profile?.avatar_url ? (
                            <img
                              src={profile.avatar_url}
                              alt="Avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                          )}
                        </motion.div>
                        <div className="flex-1 w-full">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setAvatarFile(e.target.files[0]);
                              }
                            }}
                            className="block w-full text-xs sm:text-sm text-blue-900
                              file:mr-2 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4
                              file:rounded-lg file:border-0
                              file:text-xs sm:file:text-sm file:font-semibold
                              file:bg-blue-600 file:text-white
                              hover:file:bg-blue-700 file:cursor-pointer
                              cursor-pointer"
                          />
                          <p className="text-xs text-blue-600 mt-1">
                            PNG, JPG, GIF до 5MB
                          </p>
                        </div>
                      </div>
                      {uploading && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs sm:text-sm text-blue-600 mt-2"
                        >
                          Загрузка изображения...
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-blue-900 mb-2">
                        Имя пользователя
                      </label>
                      <input
                        type="text"
                        value={profileForm.username}
                        onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-sm border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="username"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-blue-900 mb-2">
                        Полное имя
                      </label>
                      <input
                        type="text"
                        value={profileForm.full_name}
                        onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-sm border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Иван Иванов"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={updateProfile}
                        disabled={loading || uploading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition flex items-center justify-center space-x-2 text-sm sm:text-base"
                      >
                        <Save className="w-4 h-4" />
                        <span>{loading ? 'Сохранение...' : uploading ? 'Загрузка...' : 'Сохранить'}</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsEditingProfile(false);
                          setAvatarFile(null);
                          setProfileForm({
                            username: profile?.username || '',
                            full_name: profile?.full_name || '',
                            avatar_url: profile?.avatar_url || ''
                          });
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition flex items-center justify-center text-sm sm:text-base"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    key="edit-button"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditingProfile(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl transition flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Редактировать профиль</span>
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-3 sm:p-5 hover:shadow-md transition"
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="bg-amber-600 p-2 rounded-lg flex-shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-amber-700 uppercase mb-1">Email адрес</p>
                      <p className="font-medium text-amber-900 break-all text-sm">{user.email}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`bg-gradient-to-br ${isEmailConfirmed ? 'from-green-50 to-emerald-50 border-green-200' : 'from-yellow-50 to-amber-50 border-yellow-200'} border-2 rounded-xl p-3 sm:p-5 hover:shadow-md transition`}
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className={`${isEmailConfirmed ? 'bg-green-600' : 'bg-yellow-600'} p-2 rounded-lg flex-shrink-0`}>
                      {isEmailConfirmed ?
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> :
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold ${isEmailConfirmed ? 'text-green-700' : 'text-yellow-700'} uppercase mb-1`}>Статус Email</p>
                      <p className={`font-medium text-sm ${isEmailConfirmed ? 'text-green-900' : 'text-yellow-900'}`}>
                        {isEmailConfirmed ? 'Подтвержден ✓' : 'Не подтвержден'}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-3 sm:p-5 hover:shadow-md transition"
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0">
                      <Key className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-blue-700 uppercase mb-1">User ID</p>
                      <p className="font-mono text-xs text-blue-900 break-all">{user.id}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-3 sm:p-5 hover:shadow-md transition"
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="bg-purple-600 p-2 rounded-lg flex-shrink-0">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-purple-700 uppercase mb-1">Дата регистрации</p>
                      <p className="font-medium text-purple-900 text-xs sm:text-sm">{formatDate(user.created_at)}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-5"
              >
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                  <User className="w-4 h-4 mr-2 flex-shrink-0" />
                  Информация о профиле
                </h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between flex-wrap gap-2">
                    <span className="text-gray-600">Имя пользователя:</span>
                    <span className="font-medium text-gray-900 text-right">{profile?.username || 'Не указано'}</span>
                  </div>
                  <div className="flex justify-between flex-wrap gap-2">
                    <span className="text-gray-600">Полное имя:</span>
                    <span className="font-medium text-gray-900 text-right">{profile?.full_name || 'Не указано'}</span>
                  </div>
                  <div className="flex justify-between flex-wrap gap-2">
                    <span className="text-gray-600">Последний вход:</span>
                    <span className="font-medium text-gray-900 text-right">{formatDate(user.last_sign_in_at)}</span>
                  </div>
                  {profile?.updated_at && (
                    <div className="flex justify-between flex-wrap gap-2">
                      <span className="text-gray-600">Профиль обновлен:</span>
                      <span className="font-medium text-gray-900 text-right">{formatDate(profile.updated_at)}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Выйти из аккаунта</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {alert && (
          <CustomAlert
            message={alert.text}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 w-full max-w-md border-2 border-amber-200"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <div className="inline-block bg-amber-100 p-3 rounded-full mb-3">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
              {isSignUp ? 'Регистрация' : 'Вход'}
            </h2>
            <p className="text-amber-700 text-sm sm:text-base">
              {isSignUp ? 'Создайте новый аккаунт' : 'Войдите в свой аккаунт'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs sm:text-sm font-medium text-amber-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => setEmailError(validateEmail(email))}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg text-sm
                focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all
                ${emailError ? 'border-red-300' : 'border-amber-200'}`}
                placeholder="example@email.com"
                autoComplete="email"
              />
              <AnimatePresence>
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-red-600 mt-1"
                  >
                    {emailError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-amber-900 mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => setPasswordError(validatePassword(password))}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border-2 rounded-lg text-sm
                  focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all
                  ${passwordError ? 'border-red-300' : 'border-amber-200'}`}
                  placeholder="••••••••"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800 transition text-xs sm:text-sm font-medium"
                >
                  {showPassword ? "Скрыть" : "Показать"}
                </motion.button>
              </div>
              <p className="text-xs text-amber-600 mt-1">
                Минимум 6 символов. Лучше используйте буквы и цифры.
              </p>
              <AnimatePresence>
                {passwordError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-red-600 mt-1"
                  >
                    {passwordError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAuth}
              disabled={loading || !!emailError || !!passwordError}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 
              text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition duration-200 shadow-md text-sm sm:text-base"
            >
              {loading ? 'Загрузка...' : (isSignUp ? 'Зарегистрироваться' : 'Войти')}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setEmailError('');
                setPasswordError('');
              }}
              className="text-amber-700 hover:text-amber-800 font-medium transition-colors text-sm sm:text-base"
            >
              {isSignUp ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}