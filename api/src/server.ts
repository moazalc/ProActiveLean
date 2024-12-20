import express from "express";
// routes
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import checklistQuestionRoutes from "./routes/checklistQuestionRoutes";
import checklistAnswerRoutes from "./routes/checklistAnswerRoutes";
import locationRoutes from "./routes/locationRoutes";
import activityRoutes from "./routes/activityRoutes";
import findingRoutes from "./routes/findingRoutes";
import questionRoutes from "./routes/questionRoutes";
import answerRoutes from "./routes/answerRoutes";
import meetingRoutes from "./routes/meetingRoutes";
import requestRoutes from "./routes/requestRoutes";
import workshopRoutes from "./routes/workshopRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import reviewSubjectRoutes from "./routes/reviewSubjectRoutes";
import checklistAssignmentRoutes from "./routes/checklistAssignmentRoutes";
import fieldTourRoutes from "./routes/fieldTourRoutes";
import meetingActionRoutes from "./routes/meetingActionRoutes";
import locationCategoryRoutes from "./routes/locationCategoryRoutes";
import checklistActivityRoutes from "./routes/checklistActivityRoutes";
import checklistCategoryRoutes from "./routes/checklistCategoryRoutes";

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// user routes
app.use("/users", userRoutes);
// role routes
app.use("/roles", roleRoutes);
// checklist question routes
app.use("/checklist-questions", checklistQuestionRoutes);
// checklist answer routes
app.use("/checklist-answers", checklistAnswerRoutes);
// location routes
app.use("/locations", locationRoutes);
// location category routes
app.use("/location-categories", locationCategoryRoutes);
// activity routes
app.use("/activities", activityRoutes);
// finding routes
app.use("/findings", findingRoutes);
// question routes
app.use("/questions", questionRoutes);
// answer routes
app.use("/answers", answerRoutes);
// meeting routes
app.use("/meetings", meetingRoutes);
// request routes
app.use("/requests", requestRoutes);
// workshop routes
app.use("/workshops", workshopRoutes);
// review routes
app.use("/reviews", reviewRoutes);
// review subject routes
app.use("/review-subjects", reviewSubjectRoutes);
// checklist assignment routes
app.use("/checklist-assignments", checklistAssignmentRoutes);
// field tour routes
app.use("/field-tours", fieldTourRoutes);
// meeting action routes
app.use("/meeting-actions", meetingActionRoutes);
// checklist activity routes
app.use("/checklist-activities", checklistActivityRoutes);
// checklist category routes
app.use("/checklist-categories", checklistCategoryRoutes);

export default app;
