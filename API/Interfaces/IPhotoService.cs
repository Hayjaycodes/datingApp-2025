using System;
using CloudinaryDotNet.Actions;

namespace API.Interfaces;

public interface IPhotoService
{
    Task<ImageUploadResult> UploadPhotoAsync(IFormFile file); //IFORMFILE is used to represent file in DOTNET

    Task<DeletionResult> DeletePhotoAsync(string publicId);


}
