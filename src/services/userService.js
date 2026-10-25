// src/services/userService.js

const ACCOUNTS_KEY = 'voces_colombia_accounts';
const SESSION_KEY = 'voces_colombia_active_session';

const getTodayString = () => new Date().toISOString().split('T')[0];

const INITIAL_STATS = {
  currentLevel: 1,
  levelTitle: 'Novato Dialectal',
  currentXP: 0,
  nextLevelXP: 500,
  streakDays: 1,
  lastActiveDate: getTodayString(),
  exploredRegionsCount: 0,
  totalRegionsCount: 5
};

const INITIAL_REGIONS = {
  caribe: 0,
  andina: 0,
  pacifico: 0,
  orinoquia: 0,
  amazonia: 0
};

const INITIAL_ACCURACY = {
  caribe: { correct: 0, total: 0 },
  andina: { correct: 0, total: 0 },
  pacifico: { correct: 0, total: 0 },
  orinoquia: { correct: 0, total: 0 },
  amazonia: { correct: 0, total: 0 }
};

export const userService = {
  getAllAccounts: () => {
    try {
      const data = localStorage.getItem(ACCOUNTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error al leer cuentas:', e);
      return [];
    }
  },

  getActiveUserData: () => {
    try {
      const activeId = localStorage.getItem(SESSION_KEY);
      if (!activeId) return null;

      const accounts = userService.getAllAccounts();
      const account = accounts.find((acc) => acc.user.id === activeId);
      if (!account) return null;

      // Verificar racha al cargar sesión
      account.stats = userService.calculateStreak(account.stats);
      return account;
    } catch (e) {
      console.error('Error al obtener usuario activo:', e);
      return null;
    }
  },

  calculateStreak: (stats) => {
    if (!stats) return INITIAL_STATS;

    const today = getTodayString();
    const lastActive = stats.lastActiveDate;

    if (!lastActive) {
      return { ...stats, streakDays: 1, lastActiveDate: today };
    }

    if (lastActive === today) {
      return stats; // Ya realizó actividad hoy
    }

    const yesterdayObj = new Date();
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);
    const yesterday = yesterdayObj.toISOString().split('T')[0];

    if (lastActive === yesterday) {
      return {
        ...stats,
        streakDays: (stats.streakDays || 0) + 1,
        lastActiveDate: today
      };
    } else {
      // Pasó más de un día sin entrar: racha reiniciada
      return {
        ...stats,
        streakDays: 1,
        lastActiveDate: today
      };
    }
  },

  registerUser: ({ email, username, password }) => {
    const accounts = userService.getAllAccounts();
    const cleanEmail = email.trim().toLowerCase();

    const exists = accounts.some((acc) => acc.user.email === cleanEmail);
    if (exists) {
      throw new Error('El correo electrónico ya se encuentra registrado.');
    }

    const newUserObj = {
      user: {
        id: `usr_${Date.now()}`,
        email: cleanEmail,
        name: username.trim(),
        avatar: username.trim().charAt(0).toUpperCase(),
        role: 'Explorador Dialectal',
        joinedYear: new Date().getFullYear(),
        isInitialized: true,
        hasAcceptedAgeWarning: true
      },
      password: password,
      stats: { ...INITIAL_STATS },
      regionProgress: { ...INITIAL_REGIONS },
      regionAccuracy: { ...INITIAL_ACCURACY },
      unlockedBadges: [],
      completedChallenges: []
    };

    accounts.push(newUserObj);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    localStorage.setItem(SESSION_KEY, newUserObj.user.id);

    return newUserObj;
  },

  loginUser: ({ email, password }) => {
    const accounts = userService.getAllAccounts();
    const cleanEmail = email.trim().toLowerCase();

    const found = accounts.find(
      (acc) => acc.user.email === cleanEmail && acc.password === password
    );

    if (!found) {
      throw new Error('Correo electrónico o contraseña incorrectos.');
    }

    found.stats = userService.calculateStreak(found.stats);
    localStorage.setItem(SESSION_KEY, found.user.id);
    return found;
  },

  saveActiveUserData: (updatedUserData) => {
    if (!updatedUserData?.user?.id) return;

    try {
      const accounts = userService.getAllAccounts();
      const index = accounts.findIndex((acc) => acc.user.id === updatedUserData.user.id);

      if (index !== -1) {
        accounts[index] = {
          ...accounts[index],
          user: updatedUserData.user,
          stats: updatedUserData.stats,
          regionProgress: updatedUserData.regionProgress,
          regionAccuracy: updatedUserData.regionAccuracy || INITIAL_ACCURACY,
          unlockedBadges: updatedUserData.unlockedBadges,
          completedChallenges: updatedUserData.completedChallenges
        };
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
      }
    } catch (e) {
      console.error('Error al actualizar datos de la cuenta:', e);
    }
  },

  logoutUser: () => {
    localStorage.removeItem(SESSION_KEY);
  }
};