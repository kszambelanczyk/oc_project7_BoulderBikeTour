class Api::RidersController < ApplicationController

  def index
    @riders = Rider.all

    sql = <<-SQL
      SELECT
        MAX(lat) as max_lat,
        MIN(lat) as min_lat,
        MAX(lng) as max_lng,
        MIN(lng) as min_lng
      FROM riders
    SQL
    data = Rider.find_by_sql(sql).first
    @bounds = { 
      min_lat: data.min_lat,
      max_lat: data.max_lat,
      min_lng: data.min_lng,
      max_lng: data.max_lng
    }
  end


  def show
      @rider = Rider.first
  end


end
