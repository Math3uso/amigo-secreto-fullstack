import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/user/register";
import { auth } from "./controllers/user/auth";
import { refrashToken } from "./controllers/user/refrash-token";
import { checkAccessToken } from "@/middlewares/check-access-token";
import { checkMemberRole } from "@/middlewares/check-member-role";
import { memberMeController } from "./controllers/user/member-me-controller";
import { groupDeleteController } from "./controllers/groups/deleteGroup";
import { groupCreateController } from "./controllers/groups/createGroup";
import { groupUpdateController } from "./controllers/groups/updateGroup";
import { groupDetailsController } from "./controllers/groups/groupDetails";
import { fetchGroupsController } from "./controllers/groups/fetchGroups";
import { invitationCreateController } from "./controllers/invitation/invitation-create";
import { invitationIdController } from "./controllers/invitation/invitation-id";
import { startGroupController } from "./controllers/groups/startGroup";
import { getSelectMember } from "./controllers/groups/get-select-member";
import { releaveGroupController } from "./controllers/member/releaveGroup";
import { removeMemberController } from "./controllers/member/removeMember";
import { Teste } from "./controllers/teste";

export async function appRoutes(app: FastifyInstance) {
    //
    app.get("/teste", { preHandler: [checkAccessToken] }, Teste);
    app.post("/register", registerController);
    app.post("/auth", auth);
    app.get("/refrashToken", refrashToken);
    app.post("/group", { preHandler: checkAccessToken }, groupCreateController);
    app.post("/group/invite", { preHandler: [checkAccessToken, checkMemberRole] }, invitationCreateController);
    app.get("/group/invite/:id", { preHandler: checkAccessToken }, invitationIdController);
    app.put("/group", { preHandler: [checkAccessToken, checkMemberRole] }, groupUpdateController);
    app.delete("/group/member", { preHandler: [checkAccessToken, checkMemberRole] }, removeMemberController);
    app.delete("/group/releave", { preHandler: checkAccessToken }, releaveGroupController);
    app.post("/group/start", { preHandler: [checkAccessToken, checkMemberRole] }, startGroupController);
    app.get("/groups", { preHandler: [checkAccessToken] }, fetchGroupsController);
    app.post("/group/info", { preHandler: [checkAccessToken] }, groupDetailsController) // checkMemberRole
    app.post("/member/me", { preHandler: [checkAccessToken, checkMemberRole] }, memberMeController);
    app.delete("/group", { preHandler: [checkAccessToken, checkMemberRole] }, groupDeleteController);
    app.post("/group/userSelect", { preHandler: checkAccessToken }, getSelectMember);

    app.get("/teste2", { preHandler: checkAccessToken }, async (request, reply) => {
        return reply.status(200).send({ messgae: "token valido" });
    });
}