const API_BASE_URL = "http://localhost:8080/api";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
  };

  // JSON request ke liye
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Future JWT authentication ke liye
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Empty response handle karna
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const errorMessage =
      typeof data === "object" && data?.message
        ? data.message
        : "Something went wrong";

    throw new Error(errorMessage);
  }

  return data;
}

/* =========================
   GET
========================= */

export function getRequest(endpoint) {
  return apiRequest(endpoint, {
    method: "GET",
  });
}

/* =========================
   POST
========================= */

export function postRequest(endpoint, data) {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* =========================
   PUT
========================= */

export function putRequest(endpoint, data) {
  return apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/* =========================
   DELETE
========================= */

export function deleteRequest(endpoint) {
  return apiRequest(endpoint, {
    method: "DELETE",
  });
}

/* =========================
   FILE UPLOAD
========================= */

export function uploadFile(endpoint, formData) {
  return apiRequest(endpoint, {
    method: "POST",
    body: formData,
  });
}

/* =========================
   API SERVICES
========================= */

// Users
export const userApi = {
  create: (data) =>
    postRequest("/users", data),

  getAll: () =>
    getRequest("/users"),

  getById: (id) =>
    getRequest(`/users/${id}`),

  getByEmail: (email) =>
    getRequest(
      `/users/email/${encodeURIComponent(email)}`
    ),
};


// Learner Profile
export const profileApi = {
  create: (data) =>
    postRequest("/profile", data),

  getById: (id) =>
    getRequest(`/profile/${id}`),

  getByUserId: (userId) =>
    getRequest(`/profile/user/${userId}`),

  update: (data) =>
    putRequest("/profile", data),
};


// Target Roles
export const targetRoleApi = {
  getAll: () =>
    getRequest("/target-roles"),

  getById: (id) =>
    getRequest(`/target-roles/${id}`),

  getByName: (name) =>
    getRequest(
      `/target-roles/name/${encodeURIComponent(name)}`
    ),
};


// Skills
export const skillApi = {
  getAll: () =>
    getRequest("/skills"),

  getById: (id) =>
    getRequest(`/skills/${id}`),

  getByName: (name) =>
    getRequest(
      `/skills/name/${encodeURIComponent(name)}`
    ),
};


// Skill Gaps
export const skillGapApi = {
  getAll: () =>
    getRequest("/skill-gaps"),

  getById: (id) =>
    getRequest(`/skill-gaps/${id}`),

  getByLearner: (learnerProfileId) =>
    getRequest(
      `/skill-gaps/learner/${learnerProfileId}`
    ),

  getBySkill: (skillId) =>
    getRequest(`/skill-gaps/skill/${skillId}`),
};


// Roadmaps
export const roadmapApi = {
  getAll: () =>
    getRequest("/roadmaps"),

  getById: (id) =>
    getRequest(`/roadmaps/${id}`),

  getByLearner: (learnerProfileId) =>
    getRequest(
      `/roadmaps/learner/${learnerProfileId}`
    ),

  getActive: (learnerProfileId) =>
    getRequest(
      `/roadmaps/learner/${learnerProfileId}/active`
    ),

  getByVersion: (learnerProfileId, version) =>
    getRequest(
      `/roadmaps/learner/${learnerProfileId}/version/${version}`
    ),

  generate: (learnerProfileId) =>
    postRequest(
      `/roadmaps/generate/${learnerProfileId}`,
      {}
    ),
};


// Roadmap Tasks
export const roadmapTaskApi = {
  getAll: () =>
    getRequest("/roadmap-tasks"),

  getById: (id) =>
    getRequest(`/roadmap-tasks/${id}`),

  getByRoadmap: (roadmapId) =>
    getRequest(
      `/roadmap-tasks/roadmap/${roadmapId}`
    ),

  getBySkill: (skillId) =>
    getRequest(
      `/roadmap-tasks/skill/${skillId}`
    ),

  getByStatus: (roadmapId, status) =>
    getRequest(
      `/roadmap-tasks/roadmap/${roadmapId}/status/${status}`
    ),

  // Start Task
  start: (id) =>
    putRequest(
      `/roadmap-tasks/${id}/start`,
      {}
    ),

  // Complete Task
  complete: (id) =>
    putRequest(
      `/roadmap-tasks/${id}/complete`,
      {}
    ),

  // Update Task
  update: (data) =>
    putRequest("/roadmap-tasks", data),
};


// Assessments
export const assessmentApi = {
  getAll: () =>
    getRequest("/assessments"),

  getById: (id) =>
    getRequest(`/assessments/${id}`),

  getByLearner: (learnerProfileId) =>
    getRequest(
      `/assessments/learner/${learnerProfileId}`
    ),

  create: (data) =>
    postRequest("/assessments", data),
};


// Assessment Results
export const assessmentResultApi = {
  getAll: () =>
    getRequest("/assessment-results"),

  getById: (id) =>
    getRequest(`/assessment-results/${id}`),

  getByAssessment: (assessmentId) =>
    getRequest(
      `/assessment-results/assessment/${assessmentId}`
    ),

  getLatest: (assessmentId) =>
    getRequest(
      `/assessment-results/assessment/${assessmentId}/latest`
    ),

  create: (data) =>
    postRequest("/assessment-results", data),
};


// Progress
export const progressApi = {
  getAll: () =>
    getRequest("/progress"),

  getById: (id) =>
    getRequest(`/progress/${id}`),

  getByLearner: (learnerProfileId) =>
    getRequest(
      `/progress/learner/${learnerProfileId}`
    ),

  getLatest: (learnerProfileId) =>
    getRequest(
      `/progress/learner/${learnerProfileId}/latest`
    ),

  getByRoadmap: (roadmapId) =>
    getRequest(
      `/progress/roadmap/${roadmapId}`
    ),

  update: (data) =>
    putRequest("/progress", data),
};


// AI Chat
export const chatApi = {
  getHistory: (learnerProfileId) =>
    getRequest(`/chat/${learnerProfileId}`),

  sendMessage: (data) =>
    postRequest("/chat", data),
};


// Test Backend
export const testBackend = () =>
  getRequest("/test");