json.rider do
  json.partial! partial: 'api/riders/rider', locals: {rider: @rider}
end
