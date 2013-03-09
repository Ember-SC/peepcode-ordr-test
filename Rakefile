APPNAME = 'peepcode-order-test'

require 'colored'
require 'rake-pipeline'

desc "Build #{APPNAME}"
task :build do
  Rake::Pipeline::Project.new('Assetfile').invoke
end
