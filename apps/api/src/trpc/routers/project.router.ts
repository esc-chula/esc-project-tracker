import { Injectable } from '@nestjs/common';
import { ProjectService } from '../../project_/project_.service';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { ProjectType } from '@repo/shared';
import { ProjectStatus } from '@repo/shared';
import { TRPCError } from '@trpc/server';

@Injectable()
export class ProjectRouter {
  constructor(
    private readonly projectService: ProjectService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter: ReturnType<TrpcService['router']> = this.trpcService.router({
    //Get All Project
    findAllProject: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Projects'], summary: 'Get all projects' } })
      .query(() => {
        return this.projectService.findAllProjects();
      }),

    // Get Projects By UserID -> Project[]
    findProjectsByUserId: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Projects', 'Users'], summary: 'Get projects by user ID' } })
      .input(z.object({ userId: z.string().uuid() }))
      .query(({ input }) => {
        return this.projectService.findByUserID(input.userId);
      }),

    getProjectByProjectId: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Projects'], summary: 'Get project by ID' } })
      .input(z.object({ projectId: z.string().uuid() }))
      .query(({ input }) => {
        return this.projectService.findByProjectID(input.projectId);
      }),

    //Create a new Project
    createProject: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Projects'], summary: 'Create a new project', description: `Creates a new project with a specified type.

**Project Types:**
- \`10\` - INTERNAL_AFFAIR (กิจการภายใน)
- \`11\` - ARTS_CULTURE_AFFAIR (ศิลปะและวัฒนธรรม)
- \`12\` - SPORTS_AFFAIR (กีฬา)
- \`13\` - SOCIAL_SERVICE_AFFAIR (พัฒนาสังคมและบำเพ็ญประโยชน์)
- \`14\` - STUDENTS_WELFARE_ENV_AFFAIR (สวัสดิการนิสิตและสิ่งแวดล้อม)
- \`20\` - EXTERNAL_AFFAIR (กิจการภายนอก)
- \`30\` - NISITSUMPAN_AFFAIR (นิสิตสัมพันธ์)
- \`40\` - TECH_AFFAIR (เทคโนโลยี)
- \`50\` - ORGANIZATION_AFFAIR (พัฒนาองค์กร)
- \`60\` - PR_MARGETING_AFFAIR (ประชาสัมพันธ์และการตลาด)
- \`70\` - ACADEMICS_AFFAIR (วิชาการ)
- \`80\` - OTHER_ESC (อื่นๆของกวศ)
- \`90\` - OFFICE_SUPPLY_AFFAIR (สำนักงานและพัสดุ)` } })
      .input(
        z.object({
          name: z.string(),
          type: z.nativeEnum(ProjectType),
          detail: z.string().optional(),
          owner: z.string().uuid(),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.projectService.createProject({
          name: input.name,
          type: input.type,
          detail: input.detail,
          owner: input.owner,
        });
      }),
    //Create a new Outside Project
    createOutsideProject: this.trpcService.trpc.procedure
      .meta({ route: { tags: ['Projects'], summary: 'Create an outside project (public endpoint)', description: `Creates a new outside project with a specified type. (--Puifaii, I'm not sure what this actually do, will ask p'little later.)

**Project Types:**
- \`10\` - INTERNAL_AFFAIR (กิจการภายใน)
- \`11\` - ARTS_CULTURE_AFFAIR (ศิลปะและวัฒนธรรม)
- \`12\` - SPORTS_AFFAIR (กีฬา)
- \`13\` - SOCIAL_SERVICE_AFFAIR (พัฒนาสังคมและบำเพ็ญประโยชน์)
- \`14\` - STUDENTS_WELFARE_ENV_AFFAIR (สวัสดิการนิสิตและสิ่งแวดล้อม)
- \`20\` - EXTERNAL_AFFAIR (กิจการภายนอก)
- \`30\` - NISITSUMPAN_AFFAIR (นิสิตสัมพันธ์)
- \`40\` - TECH_AFFAIR (เทคโนโลยี)
- \`50\` - ORGANIZATION_AFFAIR (พัฒนาองค์กร)
- \`60\` - PR_MARGETING_AFFAIR (ประชาสัมพันธ์และการตลาด)
- \`70\` - ACADEMICS_AFFAIR (วิชาการ)
- \`80\` - OTHER_ESC (อื่นๆของกวศ)
- \`90\` - OFFICE_SUPPLY_AFFAIR (สำนักงานและพัสดุ)` } })
      .input(
        z.object({
          name: z.string(),
          type: z.nativeEnum(ProjectType),
          detail: z.string().optional(),
          owner: z.string().uuid(),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.projectService.createOutsideProject({
          name: input.name,
          type: input.type,
          detail: input.detail,
          owner: input.owner,
        });
      }),
    findProjectsWithFilter: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Projects'], summary: 'Find projects with status and department filters' } })
      .input(z.object({ status: z.string(), department: z.nativeEnum(ProjectType).optional() }))
      .query(({ input }) => {
        return this.projectService.findProjectsWithFilter({
          status: input.status,
          department: input.department,
        });
      }),

    deleteProject: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Projects'], summary: 'Delete a project (owner or admin only)' } })
      .input(z.object({ projectId: z.string().uuid() }))
      .mutation(async ({ input, ctx }) => {
        const project = await this.projectService.findByProjectID(
          input.projectId,
        );
        const isOwner = (project?.ownerId || '') === ctx.payload.sub;
        if (!isOwner && ctx.payload.role !== 'admin')
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User is not the owner of the project',
          });
        return await this.projectService.deleteProject(input.projectId);
      }),
    updateProject: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Projects'], summary: 'Update project details (owner or admin only)' } })
      .input(
        z.object({
          projectId: z.string().uuid(),
          updatedProject: z.object({
            name: z.string().optional(),
            detail: z.string().optional(),
            reserveDate: z.date().optional(),
            status: z.nativeEnum(ProjectStatus).optional(),
            type: z.nativeEnum(ProjectType).optional(),
          }),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const project = await this.projectService.findByProjectID(
          input.projectId,
        );
        const isOwner = (project?.ownerId || '') === ctx.payload.sub;
        if (!isOwner && ctx.payload.role !== 'admin')
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User is not the owner of the project',
          });

        const { projectId, updatedProject } = input;
        return this.projectService.updateProject(projectId, updatedProject);
      }),
  });
}
