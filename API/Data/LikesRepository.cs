using System;
using System.Collections.Immutable;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class LikesRepository(AppDbContext context) : ILikesRepository
{
    public void AddLike(MemberLike like)
    {
        context.Likes.Add(like);
    }

    public void DeleteLike(MemberLike like)
    {
        context.Likes.Remove(like);
    }

    public async Task<IReadOnlyList<string>> GetCurrentMemberLikeIds(string memberId)
    {
        return await context.Likes
                .Where(x => x.SourceMemberId == memberId)
                .Select(x => x.TargetMemberId)
                .ToListAsync();


    }

    public async Task<MemberLike?> GetMemberLike(string sourceMemberId, string targetMemberId)
    {
        return await context.Likes
                .FindAsync(sourceMemberId, targetMemberId);
    }

    public async Task<PaginatedResult<Member>> GetMemberLikes(LikesParam likesParam)
    {
        var query = context.Likes.AsQueryable();
        IQueryable<Member> result;

        switch (likesParam.Predicate)
        {
            case "liked":
                result = query
                       .Where(x => x.SourceMemberId == likesParam.MemberId)
                       .Select(x => x.TargetMember);
                break;
            case "likedBy":
                result = query
                        .Where(x => x.TargetMemberId == likesParam.MemberId)
                        .Select(x => x.SourceMember);
                break;
            default: // mutual
                var likeIds = await GetCurrentMemberLikeIds(likesParam.MemberId);
                result = query
                        .Where(x => x.TargetMemberId == likesParam.MemberId && likeIds.Contains(x.SourceMemberId))
                        .Select(x => x.SourceMember);
                break;
        }

        return await PagainationHelper.CreateAsync(result, likesParam.PageNumber, likesParam.PageSize);
    }

    public async Task<bool> SaveAllChanges()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
